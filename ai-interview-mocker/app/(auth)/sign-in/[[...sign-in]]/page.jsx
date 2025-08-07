import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="grid min-h-screen grid-cols-1 sm:grid-cols-2 bg-gray-50">
      {/* Form Section */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <SignIn />
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full h-64 sm:h-auto">
        <img
          alt="Login illustration"
          src="https://image.slidesdocs.com/responsive-images/docs/picture-of-artificial-intelligence-in-science-and-technology-page-border-background-word-template_dfd84202d0__1131_1600.jpg"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}
