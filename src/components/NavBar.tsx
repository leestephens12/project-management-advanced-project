const navigation = [
        { name: 'Tasks', href: '#', current: true },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const NavBar = () => (
    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
        {navigation.map((item) => (
            <a
                key={item.name}
                href={item.href}
                className={classNames(
                    item.current
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
            >
                {item.name}
            </a>
        ))}
    </div>
)

