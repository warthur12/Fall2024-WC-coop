# [Time Series](https://pandas.pydata.org/docs/user_guide/10min.html#time-series)
### Time Series in Pandas

Pandas provides robust, efficient tools for working with **time series data**. This functionality is commonly used for handling time-indexed data, especially in domains like finance, economics, and engineering, where time series are prevalent. Below, we break down key time series operations in pandas and expand on concepts such as **resampling**, **timezone localization and conversion**, and the use of **offsets**.

---

### **1. Resampling**

**Resampling** is the process of converting time series data from one frequency to another. This can involve aggregating data over time (e.g., converting secondly data into 5-minutely or daily data), which is a common task in time series analysis.

#### Example: Resampling
In the example below, we create a time series with data points every second, and then resample it into 5-minute intervals, summing up the values within each interval.

```python
rng = pd.date_range("1/1/2012", periods=100, freq="s")
ts = pd.Series(np.random.randint(0, 500, len(rng)), index=rng)

ts.resample("5Min").sum()
```

**Output:**

```
2012-01-01    24182
Freq: 5min, dtype: int64
```

- **`pd.date_range()`** creates a `DatetimeIndex` at second-level frequency.
- **`resample("5Min")`** changes the frequency to 5 minutes and aggregates the values with `.sum()`.
- Resampling can also apply other aggregation functions, such as `mean()`, `max()`, `min()`, etc.

Resampling is crucial for reducing noise, summarizing data, or preparing it for models that require specific time frequencies.

#### Similar Example:
```python
import numpy as np
import pandas as pd

rng = pd.date_range("1/1/2012", periods=20, freq="s")
ts = pd.Series(np.random.randint(0, 500, len(rng)), index=rng)

print (ts)
```

**Output**:
```
2012-01-01 00:00:00    103
2012-01-01 00:00:01    393
2012-01-01 00:00:02     78
2012-01-01 00:00:03    197
2012-01-01 00:00:04    387
2012-01-01 00:00:05     10
2012-01-01 00:00:06    263
2012-01-01 00:00:07    112
2012-01-01 00:00:08    498
2012-01-01 00:00:09    171
2012-01-01 00:00:10    386
2012-01-01 00:00:11    185
2012-01-01 00:00:12    259
2012-01-01 00:00:13    402
2012-01-01 00:00:14    117
2012-01-01 00:00:15    440
2012-01-01 00:00:16    125
2012-01-01 00:00:17    393
2012-01-01 00:00:18    192
2012-01-01 00:00:19    167
Freq: S, dtype: int64
```

---

### **2. Time Zone Localization and Conversion**

Pandas supports working with time zones. There are two key operations related to time zones:

- **`tz_localize()`**: Localizes naive timestamps to a specific time zone.
- **`tz_convert()`**: Converts time-aware series from one time zone to another.

#### Example: Time Zone Localization

```python
rng = pd.date_range("3/6/2012 00:00", periods=5, freq="D")
ts = pd.Series(np.random.randn(len(rng)), rng)

ts_utc = ts.tz_localize("UTC")
ts_cet = ts.tz_localize("CET")

print(ts_utc)
print(ts_cet)
```

**Output:**

```
2012-03-06 00:00:00+00:00   -0.309469
2012-03-07 00:00:00+00:00    1.565678
2012-03-08 00:00:00+00:00   -0.515567
2012-03-09 00:00:00+00:00    0.127753
2012-03-10 00:00:00+00:00    0.165742
Freq: D, dtype: float64

2012-03-06 00:00:00+01:00   -0.309469
2012-03-07 00:00:00+01:00    1.565678
2012-03-08 00:00:00+01:00   -0.515567
2012-03-09 00:00:00+01:00    0.127753
2012-03-10 00:00:00+01:00    0.165742
dtype: float64
```

- **`tz_localize("UTC")`** adds UTC as the time zone to the previously naive time series.

#### Example: Time Zone Conversion

After localizing the time series to UTC, you can convert it to other time zones.

```python
ts_utc.tz_convert("US/Eastern")
```

**Output:**

```
2012-03-05 19:00:00-05:00    1.857704
2012-03-06 19:00:00-05:00   -1.193545
2012-03-07 19:00:00-05:00    0.677510
2012-03-08 19:00:00-05:00   -0.153931
2012-03-09 19:00:00-05:00    0.520091
Freq: D, dtype: float64
```

- **`tz_convert("US/Eastern")`** changes the timezone from UTC to Eastern Time (US).
- This is helpful when working with datasets across different time zones, especially in global industries like finance or logistics.

---

### **3. Adding Time Offsets**

Pandas provides powerful tools to manipulate time data using **offsets**. An offset represents a duration that can be added to or subtracted from a `DatetimeIndex` or a `Timestamp`. One example is the **BusinessDay** offset, which skips weekends and holidays.

#### Example: Adding Business Days

```python
rng = pd.date_range("2012-03-06", periods=5, freq="D")

rng + pd.offsets.BusinessDay(5)
```

**Output:**

```
DatetimeIndex(['2012-03-13', '2012-03-14', '2012-03-15', '2012-03-16',
               '2012-03-16'],
              dtype='datetime64[ns]', freq=None)
```

- **`pd.offsets.BusinessDay(5)`** adds 5 business days to each date, skipping weekends (March 10th and 11th, in this case).
- Offsets like **BusinessHour**, **MonthEnd**, and **QuarterEnd** are also available.

#### Additional Explanation
The reason why **"2012-03-16"** appears twice when adding `pd.offsets.BusinessDay(5)` to the `DatetimeIndex` is due to how **business day offsets** are applied. 

Here’s a breakdown of the process:

1. **Original `DatetimeIndex`**: The range consists of five dates, all of which are continuous calendar days (not considering weekends yet):

   ```
   DatetimeIndex(['2012-03-06', '2012-03-07', '2012-03-08', '2012-03-09', '2012-03-10'])
   ```

2. **Offset of 5 Business Days**: The offset skips weekends and only counts weekdays. So, the operation starts from each date and adds 5 **business days** to each individual date in the series.

   Here’s how it works for each date:
   - **2012-03-06 (Tuesday)**: Adding 5 business days brings us to **2012-03-13 (Tuesday)**.
   - **2012-03-07 (Wednesday)**: Adding 5 business days brings us to **2012-03-14 (Wednesday)**.
   - **2012-03-08 (Thursday)**: Adding 5 business days brings us to **2012-03-15 (Thursday)**.
   - **2012-03-09 (Friday)**: Adding 5 business days brings us to **2012-03-16 (Friday)**.
   - **2012-03-10 (Saturday)**: Since it's a weekend, it skips Saturday and Sunday. Adding 5 business days from the **next business day (Monday, 2012-03-12)** also brings us to **2012-03-16 (Friday)**.

   Thus, both the 4th and 5th dates in the original index end up being offset to the same date, **2012-03-16**.

   **Final Output:**
   ```
   DatetimeIndex(['2012-03-13', '2012-03-14', '2012-03-15', '2012-03-16', '2012-03-16'])
   ```

##### Why This Happens:
- The **`BusinessDay` offset** only considers weekdays (Monday to Friday). 
- Both **2012-03-09 (Friday)** and **2012-03-10 (Saturday)** shift forward by 5 business days, and both land on the same resulting business day, **2012-03-16 (Friday)**.

This duplication is due to the fact that both the last weekday (Friday) and the weekend date (Saturday) lead to the same business day when 5 business days are added.

Offsets are essential for date manipulation in financial and business applications where operations follow working days rather than calendar days.

---

### **Additional Operations with Time Series:**

- **Shifting Data**: Shift data forward or backward by a specified number of periods, useful for calculating moving averages or working with lagged data.
  ```python
  ts.shift(1)  # Shift data forward by 1 period
  ```

- **Rolling Windows**: Apply a rolling window to calculate statistics (e.g., rolling averages) over a specified number of periods.
  ```python
  ts.rolling(window=3).mean()  # 3-period rolling average
  ```

- **Date Offsets**: Besides `BusinessDay`, you can use other offsets such as `MonthEnd` to shift dates to the end of the month:
  ```python
  ts + pd.offsets.MonthEnd(1)
  ```

- **Time Interpolation**: Use interpolation methods to fill in missing values in time series data.
  ```python
  ts.interpolate(method="time")
  ```

---

### **Conclusion**

Pandas provides a comprehensive set of tools for working with time series data. Resampling allows you to change the frequency of data; timezone localization and conversion enable seamless work across different time zones; and offsets provide fine-grained control over date manipulations. These capabilities are critical in financial, business, and other fields where time series analysis is crucial.