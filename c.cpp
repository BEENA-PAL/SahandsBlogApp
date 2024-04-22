#include <bits/stdc++.h>
using namespace std;

#define endl '\n'
#define int long long

const int MOD = 1e9 + 7;
const int INF = LLONG_MAX / 2;

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int tc;
    cin >> tc;
    while (tc--)
    {
        string s = "5000";
        string temp = s.substr(0, 1);
        //  + to_string((s[0] - '0' + 1) % 10) + s.substr(1);
        cout << temp << endl;
    }
    return 0;
}