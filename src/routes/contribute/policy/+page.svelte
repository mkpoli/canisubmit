<script lang="ts">
import { page } from "$app/state";
import * as m from "$lib/paraglide/messages";

let { data } = $props();
let venue = $derived(data.venue);
let tool = $derived(data.tool);
let policy = $derived(data.policy);
</script>

<div class="container mx-auto p-8 max-w-2xl">
  <h1 class="text-2xl font-bold mb-2">{m.form_title_policy()}</h1>
  <p class="text-gray-600 mb-6">
    {venue?.name} - {tool?.name}
  </p>

  <form method="POST" class="space-y-6 bg-white p-6 rounded-lg shadow">
    <input type="hidden" name="venueId" value={venue?.id} />
    <input type="hidden" name="toolId" value={tool?.id} />

    <div>
      <label for="status" class="block text-sm font-medium text-gray-700 mb-1">{m.form_status()}</label>
      <select
        id="status"
        name="status"
        value={policy?.status ?? 'unclear'}
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
      >
        <option value="official">{m.status_official()}</option>
        <option value="endorsed">{m.status_endorsed()}</option>
        <option value="community">{m.status_community()}</option>
        <option value="tolerated">{m.status_tolerated()}</option>
        <option value="discouraged">{m.status_discouraged()}</option>
        <option value="disallowed">{m.status_disallowed()}</option>
        <option value="unclear">{m.status_unclear()}</option>
      </select>
    </div>

    <div>
      <label for="primaryLink" class="block text-sm font-medium text-gray-700 mb-1">{m.form_link()}</label>
      <input
        type="url"
        id="primaryLink"
        name="primaryLink"
        value={policy?.primaryLink ?? ''}
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
      />
    </div>

    <div>
      <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">{m.form_notes()}</label>
      <textarea
        id="notes"
        name="notes"
        rows="3"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
        >{policy?.notes ?? ''}</textarea
      >
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-yellow-700">
            {m.notice_public_domain()}
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-end gap-3 pt-4 border-t">
      <a
        href="/"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {m.button_cancel()}
      </a>
      <button
        type="submit"
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {m.button_save()}
      </button>
    </div>
  </form>
</div>
