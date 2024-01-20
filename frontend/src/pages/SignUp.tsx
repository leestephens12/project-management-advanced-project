import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {registerUser} from "../services/api";
import {ErrorAlert} from "../components/ErrorAlert";
import {User} from "../models/User";

export const SignUp = ()  => {
    const navigate = useNavigate();

    // TODO: Refactor this into a single form state object
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [admin, setAdmin] = useState('');
    const [occupation, setOccupation] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ title: null, message: null });

    let validation = {
        matchingPasswords: confirmPassword && (password === confirmPassword),
        validEmail: email && email.match('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
    }

    const handleRegister = async (e: any): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        const user: User = { admin, company, email, firstName, lastName, occupation, password };

        try {
            await registerUser(user);
            // Navigate to login page after successful registration
            navigate("/login");
        } catch (err: any) {
            const { message, error } = err.response.data;
            setError({
                title: message,
                message: error
            });
        } finally {
            setLoading(false);
        }
    };

    return (<>
            <div className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        {(error.title && error.message) && <ErrorAlert title={error.title} message={error.message} />}
                        <div>
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Create an account
                            </h2>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="admin" className="block text-sm text-left font-medium leading-6 text-gray-900">
                                            Admin
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="admin"
                                                name="admin"
                                                type="admin"
                                                onChange={(e) => setAdmin(e.target.value)}
                                                disabled={loading}
                                                autoComplete="none"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            { !validation.validEmail &&
                                                <span className="pt-1.5 block text-sm text-left font-medium leading-6 text-red-900 italic">
                                                    Please enter a valid email
                                                </span>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="firstname" className="block text-sm text-left font-medium leading-6 text-gray-900">
                                            First Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="firstname"
                                                name="firstname"
                                                type="firstname"
                                                onChange={(e) => setFirstName(e.target.value)}
                                                disabled={loading}
                                                autoComplete="none"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="lastname" className="block text-sm text-left font-medium leading-6 text-gray-900">
                                            Last Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="lastname"
                                                name="lastname"
                                                type="lastname"
                                                onChange={(e) => setLastName(e.target.value)}
                                                disabled={loading}
                                                autoComplete="none"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="occupation" className="block text-sm text-left font-medium leading-6 text-gray-900">
                                            Occupation
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="occupation"
                                                name="occupation"
                                                type="occupation"
                                                onChange={(e) => setOccupation(e.target.value)}
                                                disabled={loading}
                                                autoComplete="none"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-sm text-left font-medium leading-6 text-gray-900">
                                            Company
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="company"
                                                name="company"
                                                type="company"
                                                onChange={(e) => setCompany(e.target.value)}
                                                disabled={loading}
                                                autoComplete="none"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm text-left font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={loading}
                                                autoComplete="none"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            { !validation.validEmail &&
                                                <span className="pt-1.5 block text-sm text-left font-medium leading-6 text-red-900 italic">
                                                    Please enter a valid email
                                                </span>
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm text-left font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                disabled={loading}
                                                autoComplete="none"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="confirm password" className="block text-sm text-left font-medium leading-6 text-gray-900">
                                            Confirm Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="confirm password"
                                                name="confirm password"
                                                type="confirm password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                disabled={loading}
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        { !validation.matchingPasswords &&
                                            <span className="pt-1.5 block text-sm text-left font-medium leading-6 text-red-900 italic">
                                                Passwords must match
                                            </span>
                                        }
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            disabled={!validation.matchingPasswords || !validation.validEmail}
                                            onClick={e => handleRegister(e)}
                                        >
                                            {loading ? <span className="loader"></span> : 'Continue'}
                                        </button>
                                    </div>

                                    <div className="text-sm text-center leading-6">
                                        <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Already have an account? Login
                                        </a>
                                    </div>

                                </form>
                            </div>

                            <div className="mt-10">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-sm font-medium leading-6">
                                        <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                                    >
                                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-sm font-semibold leading-6">GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}

