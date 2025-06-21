import { Button } from "~/components/ui/button";
import { useAuth } from "~/contexts/AuthContext";
import { useNavigate } from "react-router";
import logoSrc from "~/assets/banner0.jpg";

export function Welcome() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles the "Get Started" button click, navigating to the sign-on page.
   */
  const onGetStartedClick = () => {
    navigate("/sign-on");
  };

  /**
   * Handles the "Go to Dashboard" button click, navigating to the dashboard page.
   */
  const onGoToDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="relative isolate md:-top-6 p-5">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="hidden sm:mb-4 sm:flex sm:justify-center">
          <div className="relative rounded-full px-5 -top-3 py-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-500/20 dark:hover:ring-gray-500/40">
            Announcing our new form management features.{" "}
            <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-400">
              <span className="absolute inset-0" aria-hidden="true" />
              More COMING SOON!
            </a>
          </div>
        </div>
        <div className="text-center">
          <img src={logoSrc} alt="Handl Logo" className="rounded-md mx-auto h-32 w-auto mb-4" />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-50">
            Handl: Streamline Your Data Collection
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Handl empowers you to create custom forms and seamlessly integrate them into your application using our secure API key authentication. We simplify data collection and management, so you can focus on connecting with your users.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {!isAuthenticated ? (
              <Button onClick={onGetStartedClick} className="px-6 py-3">
                Get Started
              </Button>
            ) : (
              <Button onClick={onGoToDashboardClick} className="px-6 py-3">
                Go to Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8"> {/* Reduced py */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-50">
            Everything you need to manage your forms
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Handl provides a comprehensive suite of tools to simplify your data collection and management processes.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-4xl"> {/* Reduced mt */}
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                Easy Form Creation
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                Visually design and deploy forms with a simple, intuitive interface. No coding required.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                Secure Data Collection
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                Collect sensitive information securely with built-in encryption and access controls.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                Seamless API Integration
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                Create custom forms with ease and seamlessly integrate them into your application using our secure API key authentication.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16"> {/* Reduced mt */}
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Handl. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="text-indigo-400 hover:text-indigo-300 mx-2">Privacy Policy</a> |
            <a href="#" className="text-indigo-400 hover:text-indigo-300 mx-2">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
