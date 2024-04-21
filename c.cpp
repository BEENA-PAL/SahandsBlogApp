#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int numberOfSpecialChars(string word)
    {
        vector<int> arr(26, -1);
        vector<int> brr(26, -1);

        for (int i = 0; i < word.size(); i++)
        {
            if (word[i] >= 'A' && word[i] <= 'Z' && arr[word[i] - 'A'] == -1)
            {
                arr[word[i] - 'A'] = i;
            }
            if (word[i] >= 'a' && word[i] <= 'z')
            {

                brr[word[i] - 'a'] = i;
            }
        }
        int ans = 0;
        for (int i = 0; i < 26; i++)
        {

            if (brr[i] != -1 && arr[i] != -1 && brr[i] < arr[i])
            {
                ans++;
            }
        }
    }
};

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
    }
    return 0;
}