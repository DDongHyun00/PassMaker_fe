import React from "react";
import {Star} from "lucide-react";

const Rating = ({ value }) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={i <= value ? "text-yellow-400" : "text-gray-300"}>
                    ★
                </span>
            ))}
        </div>
    );
};

// const Rating = ({ rating = 5 }) => {
//     return (
//         <div className="flex items-center space-x-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                     key={star}
//                     className={`w-4 h-4 ${
//                         star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
//                     }`}
//                 />
//             ))}
//             <span className="text-sm text-gray-600 ml-2">3.0/5</span>
//         </div>
//     );
// };
export default Rating;