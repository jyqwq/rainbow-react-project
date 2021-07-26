// RESTART_ON_REMOUNT saga将在安装组件时启动，并在卸载组件时使用'task.cancel()'取消，以提高性能。
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
// 默认情况下（DAEMON）在组件装载时将启动saga，从未取消或重新启动。
export const DAEMON = '@@saga-injector/daemon';
// ONCE_TILL_UNMOUNT 行为类似于“重新装入时重新启动”，重新装入前不会再次运行它。
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
