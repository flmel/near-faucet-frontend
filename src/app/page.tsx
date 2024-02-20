import { RequestForm } from '@/components/forms/request-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <RequestForm />
      </div>
    </main>
  );
}
