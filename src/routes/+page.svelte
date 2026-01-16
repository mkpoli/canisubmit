<script lang="ts">
import { page } from "$app/state";
import * as m from "$lib/paraglide/messages";
import {
	getLocale,
	locales,
	localizeHref,
	setLocale,
} from "$lib/paraglide/runtime";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();

let selectedLanguage = $state("all");

let filteredVenues = $derived(
	selectedLanguage === "all"
		? data.venues
		: data.venues.filter((v) => (v.language || "en") === selectedLanguage),
);

function getPolicy(venue: any, toolId: string) {
	return venue.policies.find((p: any) => p.toolId === toolId);
}

function getStatusColor(status: string | null) {
	switch (status) {
		case "official":
			return "bg-green-100 text-green-800";
		case "community":
			return "bg-yellow-100 text-yellow-800";
		case "tolerated":
			return "bg-blue-100 text-blue-800";
		case "discouraged":
			return "bg-red-100 text-red-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
}

function getStatusLabel(status: string | null) {
	if (!status) return "-";
	// Map status to localized message
	switch (status) {
		case "official":
			return m.status_official();
		case "community":
			return m.status_community();
		case "tolerated":
			return m.status_tolerated();
		case "discouraged":
			return m.status_discouraged();
		default:
			return status.charAt(0).toUpperCase() + status.slice(1);
	}
}

function getVenueTypeLabel(type: string | null) {
	if (!type) return "";
	switch (type) {
		case "conference":
			return m.type_conference();
		case "journal":
			return m.type_journal();
		case "society":
			return m.type_society();
		case "publisher":
			return m.type_publisher();
		default:
			return type.charAt(0).toUpperCase() + type.slice(1);
	}
}

function getAreaLabel(area: string | null) {
	if (!area) return "";
	switch (area) {
		case "engineering":
			return m.area_engineering();
		case "cs":
			return m.area_cs();
		case "science":
			return m.area_science();
		default:
			return area.charAt(0).toUpperCase() + area.slice(1);
	}
}

function getLanguageName(code: string, locale: string = getLocale()) {
	try {
		return new Intl.DisplayNames([locale], { type: "language" }).of(code);
	} catch (e) {
		return code;
	}
}
</script>

<svelte:head>
  <title>{m.page_title()}</title>
</svelte:head>

<div class="container mx-auto p-8">
  <header class="mb-8 flex justify-between items-end">
    <div>
      <h1 class="text-3xl font-bold mb-2">{m.page_title()}</h1>
      <p class="text-gray-600">{m.page_subtitle()}</p>
    </div>

    <div class="flex flex-col items-end gap-2">
      <div class="flex gap-2 text-sm">
        {#each locales as locale}
          <button
            onclick={() => setLocale(locale)}
            class="hover:underline {locale === getLocale() ? 'font-bold text-indigo-700' : 'text-gray-500'}"
          >
            {getLanguageName(locale, locale)}
          </button>
        {/each}
      </div>

      <div class="flex items-center gap-4">
        <a
          href="/contribute"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {m.button_add_venue()}
        </a>
        <label for="language-select" class="text-sm font-medium text-gray-700">{m.language_label()}</label>
        <select
          id="language-select"
          bind:value={selectedLanguage}
          class="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
        >
          <option value="all">{m.language_all()}</option>
          {#each locales as locale}
            <option value={locale}>{getLanguageName(locale)}</option>
          {/each}
        </select>
      </div>
    </div>
  </header>

  <div class="overflow-x-auto shadow-md rounded-lg">
    <table class="w-full text-left text-sm text-gray-500">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" class="px-6 py-3">{m.venue_label()}</th>
          <th scope="col" class="px-6 py-3 w-32 text-center">{m.guidelines_label()}</th>
          {#each data.tools as tool}
            <th scope="col" class="px-6 py-3 text-center">
              {#if tool.website}
                <a href={tool.website} target="_blank" class="hover:underline text-gray-700 hover:text-gray-900">
                  {tool.name}
                </a>
              {:else}
                {tool.name}
              {/if}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        {#each filteredVenues as venue}
          <tr class="hover:bg-gray-50 group">
            <td class="px-6 py-4 font-medium text-gray-900">
              <div class="flex items-center justify-between">
                <div>
                  {#if venue.website}
                    <a href={venue.website} target="_blank" class="hover:underline hover:text-indigo-600">
                      {venue.name}
                    </a>
                  {:else}
                    {venue.name}
                  {/if}
                </div>
                <a
                  href="/contribute?id={venue.id}"
                  class="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title={m.form_title_edit()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </a>
              </div>
              <div class="flex items-center gap-2 mt-1 flex-wrap">
                {#if venue.type}
                  <div class="text-xs text-gray-400 font-normal">{getVenueTypeLabel(venue.type)}</div>
                {/if}
                {#if venue.area}
                  <span
                    class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    {getAreaLabel(venue.area)}
                  </span>
                {/if}
                {#if venue.language}
                  <span
                    class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600"
                  >
                    {getLanguageName(venue.language)}
                  </span>
                {/if}
              </div>
            </td>
            <td class="px-6 py-4 text-center">
              {#if venue.guidelinesUrl}
                <a
                  href={venue.guidelinesUrl}
                  target="_blank"
                  class="text-blue-600 hover:text-blue-800"
                  title={m.guidelines_label()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 mx-auto"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              {:else}
                <span class="text-gray-300">-</span>
              {/if}
            </td>
            {#each data.tools as tool}
              {@const policy = getPolicy(venue, tool.id)}
              <td class="px-6 py-4 text-center">
                {#if policy}
                  <div class="inline-flex flex-col items-center gap-1">
                    <span
                      class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {getStatusColor(
                        policy.status,
                      )}"
                    >
                      {getStatusLabel(policy.status)}
                    </span>
                    {#if policy.primaryLink}
                      <a href={policy.primaryLink} target="_blank" class="text-xs text-blue-600 hover:underline">
                        {m.source_link()}
                      </a>
                    {/if}
                  </div>
                {:else}
                  <span class="text-gray-300">-</span>
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="mt-8 p-4 bg-gray-50 rounded-md text-sm text-gray-600 border border-gray-100">
    <p>{m.disclaimer_text()}</p>
  </div>

  <footer class="mt-12 border-t border-gray-100 pt-12 pb-12">
    <div class="flex flex-col items-center gap-6">
      <a
        href="https://github.com/mkpoli/canisubmit"
        target="_blank"
        class="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <svg
          viewBox="0 0 16 16"
          class="w-5 h-5 fill-current opacity-60 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
          ><path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path></svg
        >
        <span class="font-medium">{m.footer_source_code()}</span>
      </a>

      <div class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
        <div class="flex items-center gap-2">
          <span class="text-gray-400">{m.footer_license_software()}:</span>
          <a
            href="https://github.com/mkpoli/canisubmit/blob/main/LICENSE"
            target="_blank"
            class="hover:underline hover:text-gray-900 transition-colors">{m.license_mit()}</a
          >
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-400">{m.footer_license_data()}:</span>
          <a
            href="https://github.com/mkpoli/canisubmit/blob/main/LICENSE-DATA"
            target="_blank"
            class="hover:underline hover:text-gray-900 transition-colors">{m.license_cc0()}</a
          >
        </div>
      </div>
    </div>
  </footer>
</div>
