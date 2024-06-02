yargs(hideBin(process.argv))
    .command('stats', 'get the stats of a package', async ({ argv }) => {
        const { packageName } = argv;

        if (packageName === undefined) {
            console.error('Package option is required.');
            return;
        }

        const res = await fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`);
        const data = await res.json();
        console.log(`The package had a total of ${data.downloads} downloads last month.`)
    })
    .parse();