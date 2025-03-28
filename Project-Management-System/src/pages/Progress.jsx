import React, { useEffect, useState } from "react";
import Card from '../components/Card';
import StudentCard from '../components/StudentCard';
import { Search } from 'lucide-react';

function Progress() {
    const [userRole, setUserRole] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [batches, setBatches] = useState({});
    const [filteredBatches, setFilteredBatches] = useState({});

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);

        // Fetch batches data
        fetch("https://api-project-management-kjbr.onrender.com/api/alloc/getBatches")
            .then((res) => res.json())
            .then((data) => {
                setBatches(data.batches);
                setFilteredBatches(data.batches);
            })
            .catch((error) => console.error("Error fetching batches:", error));
    }, []);

    useEffect(() => {
        // Filter batches based on search query (batch number or registration number)
        if (searchQuery.trim() === "") {
            setFilteredBatches(batches);
        } else {
            const filtered = Object.entries(batches)
                .filter(([batchNumber, batch]) => 
                    batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    batch.students.some(regNo => regNo.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {});
            setFilteredBatches(filtered);
        }
    }, [searchQuery, batches]);

    return (
        <div className="container mx-auto">
       
            
            {/* Search Bar - Only for Faculty and Project Coordinator */}
            {(userRole === "Faculty" || userRole === "Project Coordinator") && (
                <div className="mb-6 relative max-w-md mx-auto">
                 
                </div>
            )}

            {/* Render appropriate card based on user role */}
            <div>
                {userRole === "Faculty" ? (
                    <Card 
                        userRole={userRole} 
                        allowSubmit={true} 
                        readOnly={false} 
                        filteredBatches={filteredBatches}
                    />
                ) : userRole === "Project Coordinator" ? (
                    <Card 
                        userRole={userRole} 
                        allowSubmit={false} 
                        readOnly={true} 
                        disableInputs={true} 
                        filteredBatches={filteredBatches}
                    />
                ) : (
                    <StudentCard 
                        userRole={userRole} 
                        readOnly={true} 
                        filteredBatches={filteredBatches}
                    />
                )}
            </div>
        </div>
    );
}

export default Progress;
