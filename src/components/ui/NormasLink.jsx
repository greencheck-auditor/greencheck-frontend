import React from "react";

export default function NormasLink({ t }) {
  return (
    <div className="mt-8 text-center">
      <a
        href="https://www.ifrs.org/issued-standards/list-of-standards/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline hover:text-blue-900"
      >
        📘 {t.viewStandards}
      </a>
    </div>
  );
}
