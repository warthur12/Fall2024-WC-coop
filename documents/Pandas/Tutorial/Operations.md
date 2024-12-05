# [Operations](https://pandas.pydata.org/docs/user_guide/10min.html#operations)
### Operations Overview

#### Binary Operations
Binary operations in pandas align on the indices and columns of the two objects involved (Series or DataFrames). Pandas handles missing data during such operations, filling unaligned labels with `np.nan`.

#### Statistical Operations
Most statistical operations in pandas automatically exclude missing data (`np.nan`). Below are examples of basic statistical calculations:

- **Column-wise Mean Calculation:**
  The mean value for each column can be calculated using `df.mean()`:

  ```python
  df.mean()
  ```

  Output:

  ```
  A   -0.004474
  B   -0.383981
  C   -0.687758
  D    5.000000
  F    3.000000
  dtype: float64
  ```

- **Row-wise Mean Calculation:**
  The mean value for each row can be calculated by specifying `axis=1`:

  ```python
  df.mean(axis=1)
  ```

  Output:

  ```
  2013-01-01    0.872735
  2013-01-02    1.431621
  2013-01-03    0.707731
  2013-01-04    1.395042
  2013-01-05    1.883656
  2013-01-06    1.592306
  ```

#### Operations with Series/DataFrame Alignment
When operating between a Series and DataFrame with differing indices or columns, pandas aligns the result based on the union of indices/column labels. Missing labels are filled with `np.nan`. Here’s an example of subtracting a Series from a DataFrame:

```python
s = pd.Series([1, 3, 5, np.nan, 6, 8], index=dates).shift(2)
df.sub(s, axis="index")
```

The output shows the subtraction where the Series aligns with the DataFrame by index:

```
                   A         B         C    D    F
2013-01-01       NaN       NaN       NaN  NaN  NaN
2013-01-02       NaN       NaN       NaN  NaN  NaN
2013-01-03 -1.861849 -3.104569 -1.494929  4.0  1.0
2013-01-04 -2.278445 -3.706771 -4.039575  2.0  0.0
2013-01-05 -5.424972 -4.432980 -4.723768  0.0 -1.0
2013-01-06       NaN       NaN       NaN  NaN  NaN
```

### User-Defined Functions
- **`DataFrame.agg()`** applies a function that reduces the result, like an aggregation. For example, multiplying the mean of each column by 5.6:

  ```python
  df.agg(lambda x: np.mean(x) * 5.6)
  ```

  Output:

  ```
  A    -0.025054
  B    -2.150294
  C    -3.851445
  D    28.000000
  F    16.800000
  ```

- **`DataFrame.transform()`** broadcasts a function to each element in the DataFrame. For example, multiplying each element by 101.2:

  ```python
  df.transform(lambda x: x * 101.2)
  ```

  Output:

  ```
                       A           B           C      D      F
  2013-01-01    0.000000    0.000000 -152.716721  506.0    NaN
  2013-01-02  122.665737  -17.529322   12.063922  506.0  101.2
  2013-01-03  -87.219115 -212.982405  -50.086843  506.0  202.4
  2013-01-04   73.021382  -71.525239 -105.204988  506.0  303.6
  2013-01-05  -43.007200   57.382459   27.954680  506.0  404.8
  2013-01-06  -68.177398   11.501219 -149.616767  506.0  506.0
  ```

### Value Counts
Pandas allows you to count the occurrences of unique values in a Series using the `value_counts()` method, often used for histogramming or discretization.

Example:

```python
s = pd.Series(np.random.randint(0, 7, size=10))
s.value_counts()
```

Output:

```
4    5
2    2
6    2
1    1
Name: count, dtype: int64
```

### String Methods
Pandas `Series` objects are equipped with vectorized string processing methods under the `str` attribute, making it easy to apply string operations to each element in a Series.

Example of converting strings to lowercase:

```python
s = pd.Series(["A", "B", "C", "Aaba", "Baca", np.nan, "CABA", "dog", "cat"])
s.str.lower()
```

Output:

```
0       a
1       b
2       c
3    aaba
4    baca
5     NaN
6    caba
7     dog
8     cat
```