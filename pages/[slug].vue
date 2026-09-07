<script setup lang="ts">
const route = useRoute();
const slug = computed(() => String(route.params.slug || "home"));

const { data: page } = await useAsyncData(
  () => `page-${slug.value}`,
  () => queryCollection("pages").where("slug", "=", slug.value).first(),
  { watch: [slug] },
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

useSeoMeta({
  title: () => page.value?.title || "Macarroni Love",
  description: () => page.value?.description || "Links oficiais da Macarroni Love",
});
</script>

<template>
  <div class="site-shell">
    <main class="content-card">
      <NuxtLink v-if="slug !== 'home'" class="back-link" to="/home" aria-label="Voltar">
        <img src="/assets/left-arrow.png" alt="" />
      </NuxtLink>
      <div class="profile-picture" aria-hidden="true" />
      <h1>{{ page?.title }}</h1>
      <ContentRenderer v-if="page" :value="page" class="markdown-content" />
    </main>
    <footer>
      &copy; 2024
      <a href="https://github.com/sirap95" target="_blank" rel="noopener">Gregorio Siravo</a>.
      All rights reserved.
    </footer>
  </div>
</template>
