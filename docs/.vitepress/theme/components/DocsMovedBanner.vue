<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { useRoute } from "vitepress";
import { computed, ref, watchEffect } from "vue";

const el = ref<HTMLElement>();
const { height } = useElementSize(el);
watchEffect(() => {
	if (height.value) {
		document.documentElement.style.setProperty(
			"--vp-layout-top-height",
			`${height.value + 16}px`,
		);
	}
});

const route = useRoute();

const text = computed(() =>
	route.path.startsWith("/zh/")
		? "⚠ 此文档已弃用！请访问 https://clerc.so1ve.dev"
		: "⚠ We have moved our documentation to a new location! Please visit https://clerc.so1ve.dev",
);
</script>

<template>
	<a href="https://clerc.so1ve.dev">
		<div ref="el" class="banner">
			<div class="text">
				{{ text }}
			</div>
		</div>
	</a>
</template>

<style>
html {
	--vp-layout-top-height: 88px;
}

@media (min-width: 375px) {
	html {
		--vp-layout-top-height: 64px;
	}
}

@media (min-width: 768px) {
	html {
		--vp-layout-top-height: 40px;
	}
}
</style>

<style scoped>
.banner {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: var(--vp-z-index-layout-top);
	padding: 8px;
	text-align: center;
	background: #cc0000;
	color: #fff;
	display: flex;
	justify-content: space-between;
}

.text {
	flex: 1;
}
</style>
