// eslint-disable-next-line @typescript-eslint/no-require-imports
const { setupMonocle } = require('monocle2ai');

const isMainProcess = process.argv.some(arg => arg.includes('next')) &&
    !process.argv.some(arg => arg.includes('worker'));

console.log('🔧 Instrumentation| Process args:', process.argv);
console.log('🔧 Instrumentation| Is main process:', isMainProcess);
console.log('🔧 Instrumentation| Already initialized:', !!global.__monocle_initialized);

if (isMainProcess) {


    try {

        setupMonocle("nextjs.app");

        console.log("✅ Monocle| setupMonocle completed successfully");
    } catch (error) {
        console.error("❌ Monocle| setupMonocle failed:", error);
    }
}
