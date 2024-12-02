const autocannon = require('autocannon');

function runBenchmark(url) {
    autocannon(
        {
            url: "http://localhost:8000/api/product/find/67307a02ed30fe5031126609",               // API URL to test
            connections: 100,  // Number of concurrent connections
            duration: 60,      // Test duration in seconds
            method: 'GET',     // HTTP method (GET, POST, etc.)
        },
        (err, results) => {
            if (err) {
                console.error('Error running benchmark:', err);
                return;
            }
            console.log('Benchmark Results:');
            console.log(autocannon.printResult(results)); // Pretty print results
        }
    );
}

// Example usage
const apiUrl = 'http://localhost:8000/api/product/67307a02ed30fe5031126609'; // Replace with your API URL
console.log(`Running benchmark on ${apiUrl}...`);
runBenchmark(apiUrl);