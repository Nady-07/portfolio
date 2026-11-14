/**
 * Verified portfolio project catalog for Mohamed Al Nady.
 * Synced with latest CV (Mohamed_Alnady_CV_BI_Reporting_Automation.html) and local assets.
 */
window.PORTFOLIO_PROJECTS = [
    {
        id: 'samsung',
        title: 'Samsung Global Operations Performance',
        category: 'powerbi',
        categoryLabel: 'Power BI · Flagship',
        domain: 'Operations & Supply Chain BI',
        primaryMetric: '$176.95M Net Revenue',
        secondaryMetric: '$48.56M Net Profit · 27.44% Margin · 30+ DAX',
        description:
            'Enterprise multi-page Power BI solution built on a Constellation Schema unifying 5 fact tables and 5 conformed dimensions across procurement ($78.13M), manufacturing (3.83M units), logistics (7,500 shipments at 75.29% on-time delivery), and omnichannel sales. Includes desktop and mobile executive views.',
        architectureNotes:
            'Multi-fact Constellation Schema uniting Sales, Shipments, Inventory, Production, and Procurement through conformed Date, Product, Customer, Supplier, and Facility dimensions with 30+ centralized DAX measures.',
        codeLanguage: 'DAX · Executive Margin & YoY Growth',
        codeSnippet: `Profit Margin % =
DIVIDE( [Total Net Profit], [Total Net Revenue], 0 )

Revenue YoY Growth % =
VAR CurrentRev = [Total Net Revenue]
VAR PriorRev =
    CALCULATE(
        [Total Net Revenue],
        SAMEPERIODLASTYEAR( 'dim_date'[date] )
    )
RETURN
    DIVIDE( CurrentRev - PriorRev, PriorRev, 0 )`,
        tags: ['Power BI', 'DAX', 'Constellation Schema', 'Supply Chain', 'Mobile Layout'],
        featured: true,
        images: [
            'assets/samsung-executive-overview.png',
            'assets/samsung-commercial-sales.png',
            'assets/samsung-logistics.png',
            'assets/samsung-data-model.png'
        ],
        imageLabels: [
            '01 · Executive Overview',
            '02 · Commercial Sales',
            '03 · Logistics Optimization',
            '04 · Constellation Data Model'
        ],
        github: 'https://github.com/Nady-07/Samsung-Performance-Dashboard',
        download: 'assets/Samsung_Dashboard.pbix'
    },
    {
        id: 'telecom',
        title: 'Telecom Customer Churn & Revenue Retention',
        category: 'powerbi',
        categoryLabel: 'Power BI · Retention',
        domain: 'Customer Retention & Cohorts',
        primaryMetric: '$2.86M Revenue Lost',
        secondaryMetric: '7,043 Subscriber Accounts · 26.5% Churn',
        description:
            'Star Schema Power BI report analyzing 7,043 subscriber accounts ($16.06M total revenue) to quantify $2.86M revenue at risk. Isolated month-to-month contracts (42.71% churn), months 0–12 tenure (47.44% churn), electronic check billing ($1.57M lost), and add-on bundling (dropping churn to 5.29% with 4+ add-ons).',
        architectureNotes:
            'Star Schema semantic model segmenting 7,043 telecom subscribers across contract term, tenure bucket, payment method, household profile, and add-on bundles with a pop-out slicer drawer.',
        codeLanguage: 'DAX · Churn Rate & Revenue Lost',
        codeSnippet: `Total Revenue Lost =
CALCULATE(
    [Total Revenue],
    'CustomerData'[Churn] = "Yes"
)

Churn Rate % =
DIVIDE( [Churned Customers], [Total Customers], 0 )`,
        tags: ['Power BI', 'Star Schema', 'DAX', 'Churn Analysis', 'Cohort Modeling'],
        featured: true,
        images: [
            'assets/etisalat-churn-page1.png',
            'assets/etisalat-churn-page2.png',
            'assets/etisalat-churn-revenue.png',
            'assets/etisalat-churn-slicers.png'
        ],
        imageLabels: [
            '01 · Account Risk Profile',
            '02 · Services & Add-ons',
            '03 · Financial Loss View',
            '04 · Interactive Slicer Drawer'
        ],
        github: 'https://github.com/Nady-07/Telecom-Churn-Dashboard'
    },
    {
        id: 'sql-dwh',
        title: 'SQL Data Warehouse & T-SQL ETL Pipeline',
        category: 'sql',
        categoryLabel: 'SQL Server · DWH',
        domain: 'Data Engineering & Modeling',
        primaryMetric: 'Bronze / Silver / Gold',
        secondaryMetric: 'Star Schema · T-SQL Stored Procs',
        description:
            'Three-tier Medallion Data Warehouse engineered in SQL Server integrating raw CRM and ERP files. Automated Bronze ingestion, Silver cleansing (type standardization, deduplication, null handling), and Gold Star Schema reporting views with surrogate keys.',
        architectureNotes:
            'Medallion architecture (Bronze raw tables, Silver cleansed staging via T-SQL stored procedures, Gold fact and conformed dimension views) tuned for downstream Power BI consumption.',
        codeLanguage: 'T-SQL · Gold Star Schema Fact View',
        codeSnippet: `CREATE OR ALTER VIEW gold.fact_sales AS
SELECT
    s.sls_ord_num   AS order_number,
    pr.product_key  AS product_key,
    cu.customer_key AS customer_key,
    s.sls_order_dt  AS order_date,
    s.sls_sales     AS sales_amount,
    s.sls_quantity  AS quantity
FROM silver.crm_sales_details s
LEFT JOIN gold.dim_products pr  ON s.sls_prd_key = pr.product_number
LEFT JOIN gold.dim_customers cu ON s.sls_cust_id = cu.customer_id;`,
        tags: ['SQL Server', 'T-SQL', 'Medallion Architecture', 'Star Schema', 'ETL'],
        featured: true,
        images: [
            'assets/cover-sql-generic.svg'
        ],
        imageLabels: [
            '01 · SQL Data Warehouse Architecture'
        ],
        github: 'https://github.com/Nady-07/SQL_Data_Warehouse_Project'
    },
    {
        id: 'excel-adventureworks',
        title: 'AdventureWorks Sales & Profitability Workbook',
        category: 'excel',
        categoryLabel: 'Excel · Power Pivot',
        domain: 'Global Commercial Profitability',
        primaryMetric: '$307.09M Gross Sales',
        secondaryMetric: '$126.29M Profit · 41.1% Margin · 60.40K Txns',
        description:
            'Automated multi-file ingestion via Power Query (M) into a Star Schema Power Pivot data model tracking $307.09M in sales, $126.29M in net profit (41.1% margin), and 60.40K transactions across regional markets and product lines.',
        architectureNotes:
            'Power Query (M) ETL pipeline feeding a relational Excel Power Pivot Star Schema (Client, Geography, Product dimensions + Sales fact) with DAX margin calculations and interactive slicers.',
        codeLanguage: 'Power Pivot DAX · Margin & Profit Analysis',
        codeSnippet: `Total Profit :=
[Total Revenue] - [Total COGS]

% Profit Margin :=
DIVIDE( [Total Profit], [Total Revenue], 0 )`,
        tags: ['Excel', 'Power Query (M)', 'Power Pivot', 'Star Schema', 'DAX'],
        featured: true,
        images: [
            'assets/excel-adventureworks.png'
        ],
        imageLabels: [
            '01 · Profitability Dashboard'
        ],
        github: 'https://github.com/Nady-07'
    },
    {
        id: 'ibm-hr',
        title: 'IBM HR Workforce Attrition & Intelligence',
        category: 'powerbi',
        categoryLabel: 'Power BI · HR BI',
        domain: 'People Analytics & Retention',
        primaryMetric: '16.1% Attrition Rate',
        secondaryMetric: '1,470 Employees · 35 Attributes',
        description:
            'Four-page diagnostic Power BI dashboard examining workforce attrition across 1,470 employee records and 35 attributes. Identified overtime workers (30.5% turnover vs. 10.4% standard), employees under age 25 (39.18% attrition), and Sales/Lab Technician role pressures.',
        architectureNotes:
            'Multi-page people analytics semantic model evaluating demographics, compensation bands, overtime frequency, and department retention cohorts.',
        codeLanguage: 'DAX · Overtime Turnover Driver',
        codeSnippet: `Attrition Rate % =
DIVIDE(
    CALCULATE( COUNTROWS( 'Fact_HR' ), 'Fact_HR'[Attrition] = "Yes" ),
    COUNTROWS( 'Fact_HR' ),
    0
)`,
        tags: ['Power BI', 'People Analytics', 'DAX', 'Attrition Modeling'],
        featured: true,
        images: [
            'assets/ibm-hr-overview.png',
            'assets/ibm-hr-page2.png',
            'assets/ibm-hr-page3.png',
            'assets/ibm-hr-page4.png'
        ],
        imageLabels: [
            '01 · Workforce Overview',
            '02 · Attrition Deep Dive',
            '03 · Workforce Profile',
            '04 · Compensation & Satisfaction'
        ],
        github: 'https://github.com/Nady-07/IBM-HR-Attrition-Dashboard'
    },
    {
        id: 'bank-churn',
        title: 'Banking Customer Churn & Risk Modeling',
        category: 'powerbi',
        categoryLabel: 'Power BI · Risk BI',
        domain: 'Retail Banking & Deposits',
        primaryMetric: '10,000 Accounts',
        secondaryMetric: '20.37% Churn · €185.59M Lost Balance',
        description:
            'Executive retail banking retention dashboard evaluating 10,000 customer profiles (€579.27M retained vs. €185.59M churned balance). Highlighted elevated flight risk in Germany (32.44% churn, €97.97M lost) and the 46–55 age segment (50.57% churn).',
        architectureNotes:
            'Segmented retail banking account model analyzing geographic exposure, tenure buckets, balance tiers, and customer engagement status.',
        codeLanguage: 'DAX · Churned Deposit Exposure',
        codeSnippet: `Churned Balance =
CALCULATE(
    SUM( 'Fact_Bank_Accounts'[Balance] ),
    'Fact_Bank_Accounts'[Exited] = 1
)

Customer Churn % =
DIVIDE(
    CALCULATE( COUNTROWS( 'Fact_Bank_Accounts' ), 'Fact_Bank_Accounts'[Exited] = 1 ),
    COUNTROWS( 'Fact_Bank_Accounts' ),
    0
)`,
        tags: ['Power BI', 'Financial Risk', 'Segmentation', 'DAX'],
        featured: true,
        images: [
            'assets/bank-churn-overview.png'
        ],
        imageLabels: [
            '01 · Banking Retention Overview'
        ],
        github: 'https://github.com/Nady-07/Bank-Customer-Churn-Dashboard'
    },
    {
        id: 'ecommerce-sales',
        title: 'Executive Sales Performance Dashboard',
        category: 'excel',
        categoryLabel: 'Excel · Pivot BI',
        domain: 'Commercial Sales & YoY Trends',
        primaryMetric: '$14.54M Total Revenue',
        secondaryMetric: '+14.6% YoY · 28.7K Units Sold',
        description:
            'Dynamic Excel commercial reporting workbook tracking $14.54M in revenue and 28.7K units sold across 2023–2024 (+14.6% YoY growth). Maps regional revenue concentration (West $5.23M, East $4.89M), monthly seasonality, gender contribution (64.6% female), and top 10 revenue-driving SKUs.',
        architectureNotes:
            'Interactive Excel KPI workbook driven by PivotTables, normalized product/regional lookup tables, dynamic year/category slicers, and YoY variance formulas.',
        codeLanguage: 'Excel · Dynamic YoY Revenue Growth',
        codeSnippet: `YoY_Revenue_Growth :=
DIVIDE(
    [Revenue_2024] - [Revenue_2023],
    [Revenue_2023],
    0
)`,
        tags: ['Microsoft Excel', 'PivotTables', 'Slicers', 'Sales KPIs'],
        featured: false,
        images: [
            'assets/excel-sales-performance.png'
        ],
        imageLabels: [
            '01 · Executive Sales Dashboard'
        ],
        github: 'https://github.com/Nady-07/Ecommerce-Sales-Delivery-Dashboard'
    },
    {
        id: 'advanced-eda',
        title: 'Advanced SQL Exploratory Data Analysis',
        category: 'sql',
        categoryLabel: 'SQL Server · Advanced EDA',
        domain: 'Customer RFM & YoY Trends',
        primaryMetric: 'RFM Segmentation',
        secondaryMetric: 'Cumulative Totals & YoY LAG()',
        description:
            'Advanced T-SQL analytical scripts computing cumulative running revenues, moving averages, period-over-period LAG() growth deltas, customer RFM segmentation, and reusable reporting views for downstream BI.',
        architectureNotes:
            'Time-series SQL framework combining DATETRUNC monthly rollups, running window sums, YoY LAG() comparisons, and reusable customer/product reporting views.',
        codeLanguage: 'T-SQL · Cumulative & YoY Window Analysis',
        codeSnippet: `WITH MonthlySales AS (
    SELECT
        DATETRUNC(month, order_date) AS order_month,
        SUM(sales_amount) AS monthly_rev
    FROM gold.fact_sales
    WHERE order_date IS NOT NULL
    GROUP BY DATETRUNC(month, order_date)
)
SELECT
    order_month,
    monthly_rev,
    SUM(monthly_rev) OVER (ORDER BY order_month) AS running_total,
    LAG(monthly_rev, 12) OVER (ORDER BY order_month) AS prior_year_month
FROM MonthlySales;`,
        tags: ['SQL Server', 'T-SQL', 'RFM Analysis', 'Window Functions'],
        featured: false,
        images: [
            'assets/cover-sql-generic.svg'
        ],
        imageLabels: [
            '01 · Advanced SQL Analytics'
        ],
        github: 'https://github.com/Nady-07/Advanced_EDA_Project'
    },
    {
        id: 'eda-project',
        title: 'Exploratory Data Analysis Using SQL',
        category: 'sql',
        categoryLabel: 'SQL Server · EDA',
        domain: 'Business Trend Discovery',
        primaryMetric: 'Dimensional Profiling',
        secondaryMetric: 'CTEs & Revenue Concentration',
        description:
            'Structured SQL exploratory analysis workflow profiling database cardinality, date boundaries, category revenue shares, and top-N customer contributions using CTEs and window functions.',
        architectureNotes:
            'Modular SQL profiling scripts covering schema exploration, measure magnitude checks, ranking distributions, and category revenue share.',
        codeLanguage: 'T-SQL · Category Share Over Total',
        codeSnippet: `SELECT
    p.category,
    p.subcategory,
    SUM(f.sales_amount) AS total_revenue,
    CAST(SUM(f.sales_amount) * 100.0 /
         SUM(SUM(f.sales_amount)) OVER () AS DECIMAL(5,2)) AS pct_of_total
FROM gold.fact_sales f
LEFT JOIN gold.dim_products p ON f.product_key = p.product_key
GROUP BY p.category, p.subcategory
ORDER BY total_revenue DESC;`,
        tags: ['SQL Server', 'T-SQL', 'EDA', 'CTEs'],
        featured: false,
        images: [
            'assets/cover-sql-generic.svg'
        ],
        imageLabels: [
            '01 · SQL Exploratory Analysis'
        ],
        github: 'https://github.com/Nady-07/EDA_Project'
    },
    {
        id: 'flight-sql',
        title: 'Flight Booking Relational Database & Queries',
        category: 'sql',
        categoryLabel: 'SQL Server · Relational',
        domain: 'Aviation Logistics',
        primaryMetric: '10 Business Queries',
        secondaryMetric: '3NF Schema · DENSE_RANK & LAG',
        description:
            'Normalized 3NF relational flight reservation database solving operational queries with RANK(), DENSE_RANK(), LAG(), and multi-table CTEs to measure route utilization, delays, and repeat flyers.',
        architectureNotes:
            'Normalized relational schema spanning Flights, Aircrafts, Bookings, Tickets, and Boarding Passes with foreign-key integrity and analytical ranking queries.',
        codeLanguage: 'T-SQL · Route Demand Ranking',
        codeSnippet: `WITH RouteUtilization AS (
    SELECT
        f.departure_airport,
        f.arrival_airport,
        COUNT(bp.ticket_no) AS boarded_passengers,
        DENSE_RANK() OVER (ORDER BY COUNT(bp.ticket_no) DESC) AS route_rank
    FROM flights f
    JOIN boarding_passes bp ON f.flight_id = bp.flight_id
    GROUP BY f.departure_airport, f.arrival_airport
)
SELECT * FROM RouteUtilization WHERE route_rank <= 5;`,
        tags: ['SQL Server', '3NF Design', 'CTEs', 'Window Functions'],
        featured: false,
        images: [
            'assets/cover-sql-generic.svg'
        ],
        imageLabels: [
            '01 · Relational SQL Schema'
        ],
        github: 'https://github.com/Nady-07/Flight-Database-SQL-Analysis'
    },
    {
        id: 'ipl-sql',
        title: 'IPL Cricket Analytics & Match Performance',
        category: 'sql',
        categoryLabel: 'SQL Server · Sports BI',
        domain: 'Tournament & Player Metrics',
        primaryMetric: 'Strike Rate & Economy',
        secondaryMetric: 'Ball-by-Ball Aggregations',
        description:
            'Relational SQL analytics evaluating cricketer strike rates, boundary percentages, death-over bowling economy, and match-winning team factors across ball-by-ball tournament data.',
        architectureNotes:
            'Ball-by-ball and match-level SQL aggregations measuring phase-specific run rates and bowling efficiency.',
        codeLanguage: 'T-SQL · Death Overs Economy Rate',
        codeSnippet: `SELECT
    bowler,
    COUNT(*) / 6.0 AS overs_bowled,
    SUM(total_runs) AS runs_conceded,
    ROUND(SUM(total_runs) / (COUNT(*) / 6.0), 2) AS economy_rate
FROM deliveries
WHERE over_number BETWEEN 16 AND 20
GROUP BY bowler
HAVING COUNT(*) >= 120
ORDER BY economy_rate ASC;`,
        tags: ['SQL Server', 'Sports Analytics', 'T-SQL', 'Aggregations'],
        featured: false,
        images: [
            'assets/cover-sql-generic.svg'
        ],
        imageLabels: [
            '01 · SQL Performance Model'
        ],
        github: 'https://github.com/Nady-07/ipl-sql-analytics'
    },
    {
        id: 't20i-sql',
        title: 'T20I International Cricket SQL Analysis',
        category: 'sql',
        categoryLabel: 'SQL Server · Sports BI',
        domain: 'International Benchmarks',
        primaryMetric: 'Venue & Toss Impact',
        secondaryMetric: 'Chase Win Probability SQL',
        description:
            'Comparative T-SQL analysis across international T20 cricket matches evaluating venue scoring patterns, toss-win conversion rates, chase probabilities, and head-to-head team performance.',
        architectureNotes:
            'International match benchmark queries measuring conditional win probabilities by venue and innings order.',
        codeLanguage: 'T-SQL · Venue Toss Win Conversion',
        codeSnippet: `SELECT
    venue,
    COUNT(*) AS total_matches,
    SUM(CASE WHEN toss_winner = winner THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS toss_win_pct
FROM t20i_matches
GROUP BY venue
HAVING COUNT(*) >= 15
ORDER BY toss_win_pct DESC;`,
        tags: ['SQL Server', 'T-SQL', 'Comparative SQL'],
        featured: false,
        images: [
            'assets/cover-sql-generic.svg'
        ],
        imageLabels: [
            '01 · International SQL Benchmarks'
        ],
        github: 'https://github.com/Nady-07/t20i-sql-analysis'
    }
];
