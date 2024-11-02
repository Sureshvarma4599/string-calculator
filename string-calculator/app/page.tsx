"use client";
import {useRef, useState} from "react";
import Alert from '@/components/alert';
import {Table} from '@/components/table';

export default function Home() {
    const [answer, setAnswer] = useState(0);
    const [string, setString] = useState("");
    const [error, setError] = useState("");

    const [history, setHistory] = useState([]);  // Store history of calculations

    const clear = () => {
        setAnswer(0);
        setString("");
        setError(""); // Clear error message
    };

    const escapeRegExp = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special regex characters
    };

    const add = (numbers: string): number => {
        if (numbers.trim() === '') {
            return 0;
        }

        let delimiters: string[] = [',', '\n',';']; // Default delimiters
        const customDelimiterMatch = numbers.match(/^\/\/\[(.+?)\]\n/); // Custom delimiter format check

        if (customDelimiterMatch) {
            const delimiterString = customDelimiterMatch[1];
            delimiters = delimiterString.split('][').map(d => d.trim()); // Split by custom delimiters

            // Remove the custom delimiter declaration from the numbers string
            numbers = numbers.replace(customDelimiterMatch[0], '');
        }
        // Create a regex pattern to split by all delimiters, escaping them
        const delimiterRegex = new RegExp(delimiters.map(escapeRegExp).join('|'), 'g');
        const numberArray = numbers.split(delimiterRegex).map(Number).filter(n => !isNaN(n));

        // Check for negatives
        const negatives: number[] = numberArray.filter(n => n < 0);

        if (negatives.length > 0) {
            throw new Error(`negative numbers not allowed: ${negatives.join(', ')}`);
        }

        // Filter numbers <= 1000 and sum
        return numberArray.filter(n => n <= 1000).reduce((sum, n) => sum + n, 0);
    };

    const calculate = () => {
        try {
            const result = add(string);
            setAnswer(result);
            setHistory(prevHistory => [{ input: JSON.stringify(string), output: result }, ...prevHistory]); // Update history in First-In Last-Out
            setError(null);
        } catch (error) {
            setAnswer(0);
            setError(`Error: ${(error as Error).message}`);
        }
    };


    return (
        <div
            className="justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-4xl font-bold text-center">String Calculator</h1>
            <div className="flex flex-col space-y-4 pt-8">
                <div className="w-72">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                        String to calculate
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="string-calc"
                            name="string"
                            autoComplete="given-name"
                            value={string}
                            onChange={(e) => setString(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="flex space-x-2 ml-auto">
                    <button
                        type="button"
                        onClick={calculate}
                        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Calculate
                    </button>
                    <button
                        type="button"
                        onClick={clear}
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Clear
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-center">Answer</p>
                    <h1 className="text-4xl font-bold text-center pt-2">{answer}</h1>
                    {error && <Alert message={error}/>}
                </div>
            </div>
            <div className="inline-block w-96 py-2 align-middle sm:px-6 lg:px-8">
                <p className="mt-2 text-sm text-gray-700">
                    Calculation History
                </p>
               <Table data={history}/>
            </div>
        </div>
    );
}
