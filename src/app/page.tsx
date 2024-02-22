import { RequestForm } from '@/components/forms/request-form';
import { NearLogo } from '@/components/near-logo';

export default function Home() {
  // TODO: make it responsive
  // TODO: scaling
  return (
    <main className="block md:flex min-h-screen justify-between pt-40 px-80">
      <section className='w-1/2 sm:w-full'>
        <NearLogo />
      </section>
      <section className='w-1/2 sm:w-full'>
        <RequestForm />
      </section>
    </main>
  );
}
