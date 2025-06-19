import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="grid h-screen grid-cols-1 bg-gray-50 sm:grid-cols-2 overflow-hidden">
      {/* Form Section */}
      <div className="flex h-full items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
            
          <SignIn />
        </div>
      </div>

      {/* Image Section */}
      <img
        alt="Login illustration"
        src="https://plus.unsplash.com/premium_photo-1738894549184-c0b84c186e62?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="h-full w-full object-cover"
      />
    </section>
  );
}
