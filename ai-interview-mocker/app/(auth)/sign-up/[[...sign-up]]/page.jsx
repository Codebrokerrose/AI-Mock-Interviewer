import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="grid h-screen grid-cols-1 sm:grid-cols-2 bg-gray-50 overflow-hidden">
      {/* Form Section */}
      <div className="flex h-full items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <SignUp />
        </div>
      </div>

      {/* Image Section */}
      <div className="relative hidden sm:block">
        <img
          alt="Login illustration"
          src="https://image.slidesdocs.com/responsive-images/docs/picture-of-artificial-intelligence-in-science-and-technology-page-border-background-word-template_dfd84202d0__1131_1600.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
