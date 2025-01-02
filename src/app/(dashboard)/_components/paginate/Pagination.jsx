"use client"

import { useState } from "react"
import Data from "../../../../data/asset.json";
import 'react-toastify/dist/ReactToastify.css';

export const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = Data?.data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(Data.data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const changeCPage = (id) => {
        setCurrentPage(id)
    }

    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div>
            <nav>
                <ul className="flex items-center">
                    <li className="cursor-pointer text-sm mr-2 font-medium">
                        <a href="#" className="" onClick={prePage}>Prev</a>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li className={`flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer text-sm ${n == 1 ? 'bg-[#ECE8FF]' : 'bg-white'}`} key={i}>
                                <a href="#" className="page-link" onClick={() => changeCPage(n)}>{n}</a>
                            </li>
                        ))
                    }
                    <li className="cursor-pointer text-sm ml-2 font-medium">
                        <a href="#" className="" onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}