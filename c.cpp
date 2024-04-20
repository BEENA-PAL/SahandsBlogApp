#include <bits/stdc++.h>
using namespace std;

#define endl '\n'
#define int long long

const int MOD = 1e9 + 7;
const int INF = LLONG_MAX / 2;

void solve(int row, int col, vector<vector<int>> &land, vector<vector<int>> &visited, int &third, int &forth)

{
    visited[row][col] = 1;
    int n = land.size();
    int m = land[0].size();

    pair<int, int> dist[4] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    for (int i = 0; i < 4; i++)
    {
        int newRow = dist[i].first + row;
        int newCol = dist[i].second + col;

        if (newRow >= 0 and newRow < n and
            newCol >= 0 and newCol < m and
            land[newRow][newCol] == 1 and
            !visited[newRow][newCol])
        {
            third = max(newRow, third);
            forth = max(newCol, forth);
            solve(newRow, newCol, land, visited, third, forth);
        }
    }
}
vector<vector<int>> findFarmland(vector<vector<int>> &land)
{

    int n = land.size();
    int m = land[0].size();

    vector<vector<int>> ans;

    vector<vector<int>> visited(n, vector<int>(m, 0));

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            vector<int> temp;
            if (land[i][j] == 1 and !visited[i][j])
            {

                temp.push_back(i);
                temp.push_back(j);

                int third = i;
                int forth = j;

                solve(i, j, land, visited, third, forth);

                temp.push_back(third);
                temp.push_back(forth);
            }
        }
    }
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int tc;
    cin >> tc;
    while (tc--)
    {
        int n, m;
        cin >> n >> m;
        vector<vector<int>> land;
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                cin >> land[i][j];
            }
        }
        cout << "f;akdf";

        vector<vector<int>> ans = findFarmland(land);
        for (auto i : ans)
        {
            for (auto j : i)
            {
                cout << j << " ";
            }
            cout << endl;
        }
    }
    return 0;
}