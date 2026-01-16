<script lang="ts">
  import { page } from '$app/state';
  import * as m from '$lib/paraglide/messages';

  let { data } = $props();
  let venue = $derived(data.venue);
</script>

<div class="container mx-auto p-8 max-w-2xl">
  <h1 class="text-2xl font-bold mb-6">
    {venue ? m.form_title_edit() : m.form_title_add()}
  </h1>

  <form method="POST" class="space-y-6 bg-white p-6 rounded-lg shadow">
    {#if venue}
      <input type="hidden" name="id" value={venue.id} />
    {/if}

    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 mb-1">{m.form_name()}</label>
      <input
        type="text"
        id="name"
        name="name"
        value={venue?.name ?? ''}
        required
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
      />
    </div>

    <div>
      <label for="type" class="block text-sm font-medium text-gray-700 mb-1">{m.form_type()}</label>
      <select
        id="type"
        name="type"
        value={venue?.type ?? ''}
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
      >
        <option value="">-</option>
        <option value="conference">{m.type_conference()}</option>
        <option value="journal">{m.type_journal()}</option>
        <option value="society">{m.type_society()}</option>
        <option value="publisher">{m.type_publisher()}</option>
      </select>
    </div>

    <div>
      <label for="website" class="block text-sm font-medium text-gray-700 mb-1">{m.form_website()}</label>
      <input
        type="url"
        id="website"
        name="website"
        value={venue?.website ?? ''}
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
      />
    </div>

    <div>
      <label for="guidelinesUrl" class="block text-sm font-medium text-gray-700 mb-1">{m.form_guidelines()}</label>
      <input
        type="url"
        id="guidelinesUrl"
        name="guidelinesUrl"
        value={venue?.guidelinesUrl ?? ''}
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="language" class="block text-sm font-medium text-gray-700 mb-1">{m.form_language()}</label>
        <select
          id="language"
          name="language"
          value={venue?.language ?? 'en'}
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
        >
          <option value="en">{m.language_en()}</option>
          <option value="ja">{m.language_ja()}</option>
        </select>
      </div>

      <div>
        <label for="area" class="block text-sm font-medium text-gray-700 mb-1">{m.form_area()}</label>
        <select
          id="area"
          name="area"
          value={venue?.area ?? ''}
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
        >
          <option value="">-</option>
          <option value="cs">{m.area_cs()}</option>
          <option value="engineering">{m.area_engineering()}</option>
          <option value="science">{m.area_science()}</option>
        </select>
      </div>
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
