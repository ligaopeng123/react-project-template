/**
 * 区分dev test pod环境
 * @type {boolean}
 */
const isDev = process.env.REACT_APP_ENV === 'dev';
const isTest = process.env.REACT_APP_ENV === 'test';
const isPod = process.env.REACT_APP_ENV === 'pod';
module.exports = isDev ?
	require('./setupProxy.dev')
	: isTest
		? require('./setupProxy.test')
		: require('./setupProxy.pod')
