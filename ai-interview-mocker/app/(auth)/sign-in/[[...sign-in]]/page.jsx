import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen">
      {/* Left Side – Signup Form */}
      <div className="flex w-full sm:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <SignIn />
        </div>
      </div>

      {/* Right Side – Image (hidden on small screens) */}
      <div className="hidden sm:block w-1/2 h-screen">
        <img
          src="https://image.slidesdocs.com/responsive-images/docs/picture-of-artificial-intelligence-in-science-and-technology-page-border-background-word-template_dfd84202d0__1131_1600.jpg"
          alt="SignIn illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
