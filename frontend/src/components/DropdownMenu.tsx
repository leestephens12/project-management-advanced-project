import {Fragment, useEffect, useState} from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

type MenuOption = {
    name: string;
    value?: any;
}

type DropdownMenuProps = { title: string; options: MenuOption[]; onSelect: (value: any) => void }

export const DropdownMenu = ({ title, options, onSelect }: DropdownMenuProps) => {

    const [activeOption, setActiveOption] = useState<any>({
        name: '',
        value: null
    });

    useEffect(() => {
       setActiveOption(options[0]);
    }, []);

    const handleItemSelected = (option: MenuOption) => {
        setActiveOption(option);
        onSelect(option.value);
    }

    return (
        <Menu as="div" className="relative inline-block text-left mt-6">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {title}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <p className="block">{activeOption.name}</p>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {options.map((option) => (
                            <Menu.Item key={option.name}>
                                {({ active }) => (
                                    <li
                                        onClick={e => handleItemSelected(option)}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        {option.name}
                                    </li>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
