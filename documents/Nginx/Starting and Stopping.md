Most control commands follow the following schema: `nginx -s [signal]` Where `signal` is the type of control command you want to use.
**Start**:
`$ sudo service start nginx`
**Stop**:
*Stop Fast*: `nginx -s stop
*Stop Gracefully*: `nginx -s quit`
*Stop with Unix*: `kill -s QUIT [Process ID]`
	The process ID can be found in the nginx system log files, often found in `/usr/local/nginx/logs` or `/var/run`
**Other**:
*Reload*: `nginx -s reload` Reloads from a configuration file
*Open Logs*: `nginx -s reopen`
*See Running Processes with Unix*: `ps -ax | grep nginx`