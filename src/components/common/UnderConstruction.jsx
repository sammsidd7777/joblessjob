import React from "react";
import { Construction, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnderConstruction = ({
  title = "Page Under Construction",
  description = "We are working hard to bring this feature to you. Please check back soon.",
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center px-4">

      <div className="w-full max-w-lg text-center">

        {/* ICON */}
        <div className="
          mx-auto
          mb-6
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-3xl
          bg-purple-100
          text-purple-600
          dark:bg-purple-500/10
          dark:text-purple-400
        ">
          <Construction size={48} />
        </div>

        {/* TITLE */}
        <h1 className="
          text-3xl
          font-bold
          text-gray-900
          dark:text-white
        ">
          {title}
        </h1>

        {/* DESCRIPTION */}
        <p className="
          mx-auto
          mt-4
          max-w-md
          text-gray-500
          dark:text-gray-400
        ">
          {description}
        </p>

        {/* STATUS */}
        <div className="
          mx-auto
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-yellow-100
          px-4
          py-2
          text-sm
          font-medium
          text-yellow-700
          dark:bg-yellow-500/10
          dark:text-yellow-400
        ">
          <span className="h-2 w-2 rounded-full bg-yellow-500" />
          Coming Soon
        </div>

        {/* BACK BUTTON */}
        <div className="mt-8">

          <button
            onClick={() => navigate("/hr/dashboard")}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-lg
              transition
              hover:opacity-90
            "
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
};

export default UnderConstruction;