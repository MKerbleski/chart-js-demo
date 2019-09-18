##Brightfield Coding Challenge

instructions to run locally 

terminal #1
    (navigate to root folder )
    (from root folder)
    npm install (installs dependencies)
    npm run dev -- starts node server with nodemon 

terminal #2 
    (navigate to root folder )
    cd client (will be in client folder) 
    npm install (installs dependencies)
    cd .. (will be in root folder)
    npm run client -- starts local react server
    (default broswer will open to localhost:3000)


    ** to quit either process **
    ctrl + c



--Instructions--
In the attached zip file there are 3 files:
data_0119.csv
data_0219.csv
data_0319.csv

These files contain data from cannabis marketplaces, where each row is one instance of an item available on a marketplace somewhere. Each CSV represents one month of data (Jan, Feb, and Mar 2019). 

You should create a data visualization dashboard that shows some interesting and informative insights about the data.

When building the dashboard please use either Microsoft Power BI, or create a custom dashboard with javascript (and any needed javascript libraries).

Please include at least 3 figures on the dashboard, each showing a different facet of the data. Include at least one time-series figure showing month-to-month changes.