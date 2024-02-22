import { NextResponse } from 'next/server';
import { RequestTokensApiRequest } from './models';
import { TypedError } from 'near-api-js/lib/utils/errors';
import { ExecutionOutcomeWithId } from 'near-api-js/lib/providers/provider';
import { connectToFaucet } from '@/lib/near';

export async function GET() {
  const faucet = await connectToFaucet();

  try {
    const tokens = await faucet.ft_list_tokens();
    return NextResponse.json({ tokens });
  } catch (err) {
    return NextResponse.json({ error: "Error occured" }, { status: 400 });
  }
}

export async function POST(req: RequestTokensApiRequest) {
  const faucet = await connectToFaucet();

  const data = await req.json();
  const { amount, receiverId, contractId } = data;

  try {
    const result = contractId === 'near_faucet' ?
      await faucet.request_near({ request_amount: amount, receiver_id: receiverId }) :
      await faucet.ft_request_funds({ amount, receiver_id: receiverId, ft_contract_id: contractId });

    const { transaction_outcome: txo } = result;

    return NextResponse.json({ txh: txo.id }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof TypedError) {
      switch (err.type) {
        case 'FunctionCallError':
          const error: TypedError & { kind: { ExecutionError?: string; }, transaction_outcome: ExecutionOutcomeWithId; } = err as any; // need to type as any since there is no type for the model that is actually returned

          return NextResponse.json({ error: error.kind.ExecutionError || 'There was a function call error.', txh: error.transaction_outcome.id }, { status: 400 });
        default:
          return NextResponse.json({ error: "There was an error", type: err.type, context: err.context }, { status: 520 });
      }
    }
  }
}
