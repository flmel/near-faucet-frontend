import { RequestForm } from '@/components/request-form';
import { NearLogo } from '@/components/near-logo';

export default function Home() {
  return (
    <main className='w-full container mx-auto flex items-center justify-center min-h-screen'>
      <div className='p-4 lg:p-0 lg:w-3/4 w-full items-center flex flex-col space-y-5 lg:items-start lg:flex-row lg:space-x-20 justify-center'>
        <section>
          <NearLogo />
        </section>
        <section className='w-full lg:w-5/12 md:w-2/3'>
          <RequestForm />
        </section>
      </div>
    </main>
  );
}
