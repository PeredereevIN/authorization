"use client"
import React, { useState } from "react";

type PerformanceRecord = {
    id: number;
    studentName: string;
    subject: string;
    grade: string;
};

const initialData: PerformanceRecord[] = [
    { id: 1, studentName: "Иван Иванов", subject: "Математика", grade: "A" },
    { id: 2, studentName: "Мария Петрова", subject: "Физика", grade: "B" },
    { id: 3, studentName: "Алексей Смирнов", subject: "Химия", grade: "C" },
];

const Performance = () => {
    const [role, setRole] = useState("Student");
    const [data, setData] = useState<PerformanceRecord[]>(initialData);

    const roles = ["Student", "Teacher", "Admin"];

    const handleGradeChange = (id: number, newGrade: string) => {
        setData((prevData) =>
            prevData.map((record) =>
                record.id === id ? { ...record, grade: newGrade } : record
            )
        );
    };

    const renderRoleContent = () => {
        if (role === "Admin") {
            return <p className="text-green-700 font-semibold">Вы вошли как администратор. У вас есть полный доступ к системе.</p>;
        }

        return (
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">Студент</th>
                        <th className="px-6 py-3 text-left">Предмет</th>
                        <th className="px-6 py-3 text-center">Оценка</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ id, studentName, subject, grade }) => (
                        <tr
                            key={id}
                            className="bg-white hover:bg-blue-50 transition-colors duration-200"
                        >
                            <td className="px-6 py-4 border-b border-gray-200">{studentName}</td>
                            <td className="px-6 py-4 border-b border-gray-200">{subject}</td>
                            <td className="px-6 py-4 border-b border-gray-200 text-center">
                                {role === "Teacher" ? (
                                    <input
                                        type="text"
                                        value={grade}
                                        onChange={(e) => handleGradeChange(id, e.target.value)}
                                        className="w-16 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                ) : (
                                    <span className="font-semibold">{grade}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Успеваемость</h1>
            <div className="mb-6">
                <span className="block mb-3 font-semibold text-gray-700">Выберите роль:</span>
                <div className="flex space-x-4">
                    {roles.map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={`px-5 py-2 rounded-md font-medium transition-colors duration-200 ${role === r
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>
            {renderRoleContent()}
        </div>
    );
};

export default Performance;