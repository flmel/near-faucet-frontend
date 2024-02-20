import { connectToNearAccount } from '@/lib/near';
import { NextResponse } from 'next/server';
import { RequestTokensApiRequest } from './models';
import { TypedError } from 'near-api-js/lib/utils/errors';
import { ExecutionStatus } from 'near-api-js/lib/providers/provider';

export async function GET() {
  await connectToNearAccount();

  try {
    const tokens = await nearAccount.viewFunction({ contractId: process.env.NEAR_FAUCET_ID, methodName: "ft_list_tokens" });
    return NextResponse.json({ tokens });
  } catch (err) {
    // TODO: handle error
    throw err;
  }
}

export async function POST(req: RequestTokensApiRequest) {
  await connectToNearAccount();

  const data = await req.json();
  const { amount, receiverId, contractId } = data;

  try {
    const result = contractId === 'near_faucet' ?
      // TODO: extract gas in CONST
      // TODO: create a wrapper around nearAccount function and view calls to avoid repetitiveness and to type the methodNames
      await nearAccount.functionCall({ contractId: process.env.NEAR_FAUCET_ID, methodName: "request_near", args: { request_amount: amount, receiver_id: receiverId }, gas: '300000000000000' })
      :
      await nearAccount.functionCall({ contractId: process.env.NEAR_FAUCET_ID, methodName: "ft_request_funds", args: { amount, receiver_id: receiverId, ft_contract_id: contractId }, gas: '300000000000000' });

    const { transaction_outcome: txo } = result;
    const status = txo.outcome.status as ExecutionStatus;

    const tx = status && 'SuccessReceiptId' in status ? status.SuccessReceiptId : "";

    return NextResponse.json({ tx });
  } catch (err: unknown) {
    if (err instanceof TypedError) {
      switch (err.type) {
        case 'FunctionCallError':
          const error: TypedError & { kind: { ExecutionError?: string; }; } = err as any; // need to type as any since there is no type for the model that is actually returned
          return Response.json({ error: error.kind.ExecutionError || 'There was a function call error.' }, { status: 405 });
        default:
          return Response.json({ error: "There was an error", type: err.type, context: err.context }, { status: 520 });
      }
    }
  }
}
