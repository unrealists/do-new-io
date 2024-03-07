Develop with Wrangler CLI
Build, preview, and deploy your Workers from the Wrangler command line interface (CLI). Once set up, you’ll be able to quickly iterate on this Worker’s code and configuration from your local development environment.
Using Wrangler CLI

Install Wrangler
npmyarn
npm install -g wrangler
Click to copy
See detailed installation instructions

Authenticate Wrangler with your Cloudflare account
To enable Wrangler to deploy your scripts to Cloudflare, you'll need to authenticate by logging in to your Cloudflare account.

wrangler login
Click to copy

When wrangler automatically opens your browser to display Cloudflare’s consent screen, click the Allow button. This will send an API Token to Wrangler.


Initialise a new project from this Worker
wrangler init --from-dash donew
Click to copy

Publish your Wrangler project
Deploy your project to Cloudflare’s global network:

wrangler publish
Click to copy

That’s it! 🎉
You’ve deployed this project to Cloudflare. To support you along your journey developing with the Wrangler CLI here are some resources:

Wrangler Commands
wrangler.toml Config