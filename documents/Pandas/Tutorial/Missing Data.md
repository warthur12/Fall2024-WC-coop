# [Missing Data](https://pandas.pydata.org/docs/user_guide/10min.html#missing-data)
In NumPy, `np.nan` represents missing data, which is automatically excluded from computations. This makes handling missing data simpler, especially when performing mathematical operations. You can refer to the "Missing Data" section for more details on handling such cases.

### Reindexing
Reindexing is used to modify the index of a DataFrame along a specified axis. This allows you to add, delete, or change the existing index. When you reindex, it returns a copy of the data. Here's an example:

```python
df1 = df.reindex(index=dates[0:4], columns=list(df.columns) + ["E"])
df1.loc[dates[0]:dates[1], "E"] = 1
```

In this code:
- The DataFrame `df1` is reindexed based on the first four dates and a new column `"E"` is added.
- A value of `1` is assigned to the `"E"` column for the first two dates (`dates[0]` to `dates[1]`).

The resulting DataFrame looks like this:

```
                   A         B         C    D    F    E
2013-01-01  0.000000  0.000000 -1.509059  5.0  NaN  1.0
2013-01-02  1.212112 -0.173215  0.119209  5.0  1.0  1.0
2013-01-03 -0.861849 -2.104569 -0.494929  5.0  2.0  NaN
2013-01-04  0.721555 -0.706771 -1.039575  5.0  3.0  NaN
```

### Handling Missing Data
Pandas offers several methods to deal with missing data.

#### 1. **Dropping Missing Data** (`dropna`)
The `dropna()` method removes any rows that contain missing data (`NaN`). By specifying `how="any"`, rows with even a single missing value will be dropped:

```python
df1.dropna(how="any")
```

Resulting DataFrame:

```
                   A         B         C    D    F    E
2013-01-02  1.212112 -0.173215  0.119209  5.0  1.0  1.0
```

In this case, only the row for `2013-01-02` remains because all other rows contain missing data.

#### 2. **Filling Missing Data** (`fillna`)
You can fill in missing data using the `fillna()` method. For instance, filling missing values with a constant value like `5`:

```python
df1.fillna(value=5)
```

The DataFrame with missing values filled:

```
                   A         B         C    D    F    E
2013-01-01  0.000000  0.000000 -1.509059  5.0  5.0  1.0
2013-01-02  1.212112 -0.173215  0.119209  5.0  1.0  1.0
2013-01-03 -0.861849 -2.104569 -0.494929  5.0  2.0  5.0
2013-01-04  0.721555 -0.706771 -1.039575  5.0  3.0  5.0
```

#### 3. **Checking for Missing Data** (`isna`)
The `isna()` function returns a boolean mask where each element is `True` if the value is `NaN` and `False` otherwise. For example:

```python
pd.isna(df1)
```

The resulting mask:

```
                A      B      C      D      F      E
2013-01-01  False  False  False  False   True  False
2013-01-02  False  False  False  False  False  False
2013-01-03  False  False  False  False  False   True
2013-01-04  False  False  False  False  False   True
```

This allows you to easily identify where the missing values are located in the DataFrame.