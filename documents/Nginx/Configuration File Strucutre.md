*Two types of directives*: Simple and Block
**Simple Directives**:
	Only a name and parameters.
	Separated by a "`;`".
**Block Directives**"
	Similar to Simple Directives but instead of semicolons they end with additional instructions.

*Block Example*:
```nginx
server {
	location / {
		root /data/www;
	}

	location /images/ {
		root /data;
	}
}
```
*Example Explanation*:
	While not present here, the `html` block is implied. The structure would normally be (and is read by Nginx as) `htmp { server  {} }`
	The `location` blocks specify the structure of the web app is compared when a web request is made. When `http://localhost/` is called it returns the root specified in the first location block. When `http://localhost/images/` is called, the second location block is used.
	The way files are chosen is determined by what comes after the `/` in the URL. for examples, if there is an image named `test.png` in the `/images` folder, you could retrieve it by using `http://localhost/images/test.png`.

Any directives that are placed outside of any specific context is considered to be in the `main` context.

*Commenting*: Use "`#`"