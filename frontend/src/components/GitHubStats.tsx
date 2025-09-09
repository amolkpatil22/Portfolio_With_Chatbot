import { useState, useEffect } from 'react';
import { Github, GitCommit, Star, GitBranch, Calendar, TrendingUp } from 'lucide-react';

interface GitHubStats {
  totalCommits: number;
  totalStars: number;
  totalRepos: number;
  contributionStreak: number;
  thisYearCommits: number;
}

const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Replace with your GitHub username
  const username = 'amolkpatil22';

  useEffect(() => {
    // Mock data - replace with actual GitHub API calls
    setTimeout(() => {
      setStats({
        totalCommits: 1247,
        totalStars: 89,
        totalRepos: 42,
        contributionStreak: 15,
        thisYearCommits: 324
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            GitHub Statistics
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            My coding journey and contribution metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <GitCommit className="text-green-500" size={24} />
              <span className="text-2xl font-bold text-gray-800">{stats?.totalCommits}</span>
            </div>
            <p className="text-gray-600 text-sm">Total Commits</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Star className="text-yellow-500" size={24} />
              <span className="text-2xl font-bold text-gray-800">{stats?.totalStars}</span>
            </div>
            <p className="text-gray-600 text-sm">Stars Earned</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <GitBranch className="text-blue-500" size={24} />
              <span className="text-2xl font-bold text-gray-800">{stats?.totalRepos}</span>
            </div>
            <p className="text-gray-600 text-sm">Repositories</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="text-purple-500" size={24} />
              <span className="text-2xl font-bold text-gray-800">{stats?.contributionStreak}</span>
            </div>
            <p className="text-gray-600 text-sm">Day Streak</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="text-red-500" size={24} />
              <span className="text-2xl font-bold text-gray-800">{stats?.thisYearCommits}</span>
            </div>
            <p className="text-gray-600 text-sm">This Year</p>
          </div>
        </div>

        {/* GitHub Contribution Graph */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Github size={24} />
            Contribution Activity
          </h3>
          <div className="flex justify-center">
            <img 
              src={`https://ghchart.rshah.org/${username}`}
              alt="GitHub Contribution Chart"
              className="max-w-full h-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* GitHub Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">GitHub Stats</h3>
            <img 
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=default&hide_border=true`}
              alt="GitHub Stats"
              className="w-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/400x200/f3f4f6/6b7280?text=GitHub+Stats+Unavailable';
              }}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Most Used Languages</h3>
            <img 
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=default&hide_border=true`}
              alt="Top Languages"
              className="w-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/400x200/f3f4f6/6b7280?text=Language+Stats+Unavailable';
              }}
            />
          </div>
        </div>

        {/* GitHub Streak */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Contribution Streak</h3>
          <div className="flex justify-center">
            <img 
              src={`https://github-readme-streak-stats-salesp07.vercel.app/?user=${username}&theme=default&hide_border=true`}
              alt="GitHub Streak"
              className="max-w-full h-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/500x200/f3f4f6/6b7280?text=Streak+Stats+Unavailable';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;