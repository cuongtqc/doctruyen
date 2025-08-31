// /app/admin/importer/page.jsx
"use client";

import { importStory } from "@/lib/actions/importer";
import { useState, useTransition } from "react";

export default function ImporterPage() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState(null);

  /**
   * @param {FormData} formData
   */
  const handleSubmit = (formData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await importStory(formData);
      setMessage(result);
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Import New Story</h1>
      <form action={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Source URL
          </label>
          <input
            type="url"
            name="url"
            id="url"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black p-2"
            placeholder="https://www.69shu.tw/book/21.html"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "Importing..." : "Start Import"}
        </button>
      </form>
      {message?.success && (
        <p className="mt-4 text-green-600">{message.success}</p>
      )}
      {message?.error && <p className="mt-4 text-red-600">{message.error}</p>}
    </div>
  );
}
