---
layout: home

hero:
  name: Members
  tagline: Clerc Open Source Team
---

<script setup>
import { VPTeamMembers } from "vitepress/theme";

const members = [
	{
		avatar: "https://avatars.githubusercontent.com/u/58381667?v=4",
		name: "Ray",
		title: "Creator, Documentation",
		links: [
			{ icon: "github", link: "https://github.com/so1ve" },
			{ icon: "twitter", link: "https://twitter.com/so1v3" },
		],
	},
	{
		avatar: "https://avatars.githubusercontent.com/u/73536163?v=4",
		name: "Shizuku",
		title: "Documentation",
		links: [
			{ icon: "github", link: "https://github.com/ifshizuku" },
			{ icon: "twitter", link: "https://twitter.com/ifszk" },
		],
	},
];
</script>

<VPTeamMembers :members="members" />
