import { defineConfig } from "vitepress";

export const zhConfig = defineConfig({
	lang: "zh-CN",
	description: "全功能 CLI 库",
	themeConfig: {
		siteTitle: "Clerc 官方中文文档",
		nav: [
			{
				text: "指南",
				link: "/zh/getting-started",
			},
			{
				text: "成员",
				link: "/zh/members",
			},
			{
				text: "捐赠作者",
				link: "https://afdian.net/a/so1ve",
			},
		],
		sidebar: [
			{
				text: "指南",
				items: [
					{
						text: "快速开始",
						link: "/zh/getting-started",
					},
					{
						text: "命令",
						link: "/zh/commands",
					},
					{
						text: "拦截器",
						link: "/zh/interceptors",
					},
					{
						text: "插件",
						link: "/zh/plugins",
					},
				],
			},
			{
				text: "Official Plugins",
				link: "/zh/official-plugins",
			},
		],
		editLink: {
			text: "给本页内容提出建议",
			pattern: "https://github.com/clercjs/website/tree/main/docs/:path",
		},
		outline: {
			label: "本页内容",
		},
		docFooter: {
			prev: "上一页",
			next: "下一页",
		},
		footer: {
			message: "在 MIT 许可证下发布",
			copyright: "版权许可 © 2023-现在 ClercJS",
		},
		search: {
			provider: "local",
			options: {
				locales: {
					zh: {
						translations: {
							button: {
								buttonText: "搜索文档",
								buttonAriaLabel: "搜索文档",
							},
							modal: {
								noResultsText: "无法找到相关结果",
								resetButtonTitle: "清除查询条件",
								footer: {
									selectText: "选择",
									navigateText: "切换",
								},
							},
						},
					},
				},
			},
		},
	},
});
