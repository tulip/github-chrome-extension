# github-chrome-extension

Chrome Extension to customize Github

# Hacking

In chrome, go to Tools -> Extensions, click "Load unpacked", and select
the `tulip-github-extension` folder. This will run the extension in your
browser. When you make changes, you need to click the reload button on the
card for the extension on the Tools -> Extensions page (it's the little
circular arrow).

# Publishing

1. Grab the `.pem` file from 1pw under "Github Chrome Extension." The best way
   to do this is to select "Show in finder" -- this will reveal it in a
   temporary folder, and you can leave it to 1pw to keep it safe.
   Don't leave the `.pem` sitting around on your computer outside 1pw!

2. In Chrome, go to Tools -> Extensions, and select "Pack extension". Choose
   the `tulip-github-extension` folder and the `.pem` fle from step 1. This
   will create `tulip-github-extension.crx` in this folder.

3. Upload the new version to the wiki page: https://tulipmfg.atlassian.net/wiki/spaces/PLAT/pages/6258710/Setting+up+the+Tulip+Github+Extension
