import { quizStrings } from './lib/llmq/strings';

function moduleText(language: 'en' | 'zh-CN') {
	const { title, subtitle } = quizStrings(language);
	return { title, description: subtitle };
}

export const moduleMeta = {
	id: 'llmq',
	languages: ['en', 'zh-CN'],
	text: {
		en: moduleText('en'),
		'zh-CN': moduleText('zh-CN'),
	},
} as const;
