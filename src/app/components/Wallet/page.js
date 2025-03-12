"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import Navbar from "@/app/components/navbar/page";
import Image from "next/image";

const Wallet = () => {
  const [balance, setBalance] = useState(5000);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const balanceRef = useRef(null);
  const transactionsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(balanceRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 });
    gsap.fromTo(transactionsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }, [balance, transactions]);

  const handleTransaction = (type) => {
    setError("");
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    const value = parseFloat(amount);

    if (type === "withdraw" && value > balance) {
      setError("Insufficient balance to withdraw!");
      return;
    }

    setBalance((prev) => (type === "deposit" ? prev + value : prev - value));
    setTransactions((prev) => [{ type, amount: value, date: new Date().toLocaleString() }, ...prev]);
    setAmount("");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="pt-28 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[500px] text-center border border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">My Wallet</h1>

          {/* Wallet Image and Balance Side by Side */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image src="/wallet.png" alt="Wallet Icon" width={80} height={80} />
            <p ref={balanceRef} className="text-4xl font-bold text-green-600">
              ₹{balance.toLocaleString()}
            </p>
          </div>

          <input
            type="number"
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex justify-between mt-6">
            <button onClick={() => handleTransaction("deposit")} className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md">
              <FiPlusCircle className="mr-2 text-lg" /> Deposit
            </button>
            <button onClick={() => handleTransaction("withdraw")} className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md">
              <FiMinusCircle className="mr-2 text-lg" /> Withdraw
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div ref={transactionsRef} className="bg-white mt-8 p-6 rounded-xl shadow-lg w-[500px] border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions yet</p>
          ) : (
            <ul className="space-y-3">
              {transactions.map((txn, index) => (
                <li key={index} className={`flex justify-between px-4 py-2 rounded-lg ${txn.type === "deposit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  <span>{txn.type === "deposit" ? "Deposited" : "Withdrawn"} ₹{txn.amount}</span>
                  <span className="text-sm text-gray-500">{txn.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
