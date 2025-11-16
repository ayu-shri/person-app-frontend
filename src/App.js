import React, { useState } from 'react';
import { Users, Sparkles, TrendingUp, TrendingDown, Minus, ChevronRight, BarChart3, Moon, Sun, X, Briefcase, DollarSign, Smartphone } from 'lucide-react';

const FocusGroupSimulator = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [step, setStep] = useState(1);
    const [groupDescription, setGroupDescription] = useState('');
    const [numProfiles, setNumProfiles] = useState(8);
    const [simulationPrompt, setSimulationPrompt] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [simulationData, setSimulationData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProfile, setSelectedProfile] = useState(null);

    // For testing in artifact, use localhost. In your actual app, use process.env.REACT_APP_API_URL
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    const generateProfiles = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/focus-group/generate-profiles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    groupDescription: groupDescription,
                    numProfiles: numProfiles
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate profiles');
            }

            const data = await response.json();
            setProfiles(data);
            setStep(2);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const runSimulation = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/api/focus-group/run-simulation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    profiles: profiles,
                    simulationPrompt: simulationPrompt
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to run simulation');
            }

            const data = await response.json();
            setSimulationData(data);
            setStep(4);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getSentimentColor = (sentiment) => {
        if (darkMode) {
            if (sentiment === 'Positive') return 'text-emerald-400 bg-emerald-950 border-emerald-800';
            if (sentiment === 'Negative') return 'text-rose-400 bg-rose-950 border-rose-800';
            return 'text-amber-400 bg-amber-950 border-amber-800';
        }
        if (sentiment === 'Positive') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
        if (sentiment === 'Negative') return 'text-rose-700 bg-rose-50 border-rose-200';
        return 'text-amber-700 bg-amber-50 border-amber-200';
    };

    const getSentimentIcon = (sentiment) => {
        if (sentiment === 'Positive') return <TrendingUp className="w-4 h-4" />;
        if (sentiment === 'Negative') return <TrendingDown className="w-4 h-4" />;
        return <Minus className="w-4 h-4" />;
    };

    const bgClass = darkMode ? 'bg-gray-950' : 'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50';
    const cardClass = darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-slate-200';
    const textPrimary = darkMode ? 'text-gray-100' : 'text-slate-900';
    const textSecondary = darkMode ? 'text-gray-400' : 'text-slate-600';
    const inputClass = darkMode 
        ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500' 
        : 'bg-white border-slate-300 text-slate-900 focus:ring-purple-500 focus:border-purple-500';

    return (
        <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
            {/* Header */}
            <div className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-slate-200'} border-b transition-colors duration-300`}>
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className={`text-2xl font-bold ${textPrimary}`}>Focus Group Simulator</h1>
                                <p className={`text-sm ${textSecondary}`}>AI-powered market research insights</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-3 rounded-xl ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-slate-100 text-slate-700'} hover:scale-110 transition-all duration-200`}
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        step >= 1 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                            : darkMode ? 'bg-gray-800 text-gray-500' : 'bg-white text-slate-400'
                    }`}>
                        <span className="font-bold">1</span>
                        <span className="text-sm font-medium hidden sm:inline">Define Group</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-gray-700' : 'text-slate-300'}`} />
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        step >= 2 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                            : darkMode ? 'bg-gray-800 text-gray-500' : 'bg-white text-slate-400'
                    }`}>
                        <span className="font-bold">2</span>
                        <span className="text-sm font-medium hidden sm:inline">Review Profiles</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-gray-700' : 'text-slate-300'}`} />
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        step >= 3 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                            : darkMode ? 'bg-gray-800 text-gray-500' : 'bg-white text-slate-400'
                    }`}>
                        <span className="font-bold">3</span>
                        <span className="text-sm font-medium hidden sm:inline">Test Scenario</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-gray-700' : 'text-slate-300'}`} />
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        step >= 4 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                            : darkMode ? 'bg-gray-800 text-gray-500' : 'bg-white text-slate-400'
                    }`}>
                        <span className="font-bold">4</span>
                        <span className="text-sm font-medium hidden sm:inline">View Results</span>
                    </div>
                </div>

                {error && (
                    <div className={`mb-6 p-4 rounded-xl border-2 ${darkMode ? 'bg-rose-950 border-rose-800 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-700'} animate-pulse`}>
                        {error}
                    </div>
                )}

                {/* Step 1: Define Focus Group */}
                {step === 1 && (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <div className={`${cardClass} rounded-3xl shadow-2xl p-8 border transition-colors duration-300`}>
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>Define Your Focus Group</h2>
                                <p className={textSecondary}>Describe the demographic you want to simulate</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className={`block text-sm font-semibold ${textPrimary} mb-3`}>
                                        Target Audience Description
                                    </label>
                                    <textarea
                                        value={groupDescription}
                                        onChange={(e) => setGroupDescription(e.target.value)}
                                        placeholder="e.g., Tech-savvy millennials in urban areas who care about sustainability"
                                        rows="4"
                                        className={`w-full px-4 py-3 border-2 rounded-2xl transition-all duration-200 ${inputClass}`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-semibold ${textPrimary} mb-3`}>
                                        Number of Participants
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="3"
                                            max="15"
                                            value={numProfiles}
                                            onChange={(e) => setNumProfiles(parseInt(e.target.value))}
                                            className="flex-1 h-3 bg-gradient-to-r from-purple-200 to-fuchsia-200 rounded-full appearance-none cursor-pointer"
                                            style={{
                                                background: darkMode 
                                                    ? 'linear-gradient(to right, rgb(147, 51, 234), rgb(192, 38, 211))' 
                                                    : 'linear-gradient(to right, rgb(233, 213, 255), rgb(250, 232, 255))'
                                            }}
                                        />
                                        <div className={`text-2xl font-bold ${textPrimary} w-12 text-center`}>
                                            {numProfiles}
                                        </div>
                                    </div>
                                    <div className={`flex justify-between text-xs ${textSecondary} mt-2`}>
                                        <span>Fewer</span>
                                        <span>More diverse insights</span>
                                    </div>
                                </div>

                                <button
                                    onClick={generateProfiles}
                                    disabled={!groupDescription.trim() || loading}
                                    className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                            Generating Profiles...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-6 h-6" />
                                            Generate Focus Group
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Review Profiles */}
                {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className={`${cardClass} rounded-3xl shadow-2xl p-8 border transition-colors duration-300`}>
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>Review Your Focus Group</h2>
                                <p className={textSecondary}>Click on any participant to view their full profile</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                {profiles.map((p, idx) => (
                                    <button
                                        key={p.index}
                                        onClick={() => setSelectedProfile(p)}
                                        className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl text-left cursor-pointer ${
                                            darkMode 
                                                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500' 
                                                : 'bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-200 hover:border-purple-400'
                                        }`}
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className={`font-bold ${textPrimary} text-lg`}>{p.name}</div>
                                        <div className={`text-sm ${textSecondary} mt-1`}>{p.age}, {p.occupation}</div>
                                        <div className={`text-xs ${textSecondary} mt-3 line-clamp-2`}>{p.trait}</div>
                                        <div className={`text-xs ${darkMode ? 'text-purple-400' : 'text-purple-600'} mt-3 font-medium`}>
                                            Click for details →
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setStep(1)}
                                    className={`px-8 py-3 font-semibold rounded-2xl transition-all duration-200 hover:scale-105 ${
                                        darkMode 
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                >
                                    ← Regenerate
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
                                >
                                    Continue to Scenario →
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Test Scenario */}
                {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className={`max-w-2xl mx-auto ${cardClass} rounded-3xl shadow-2xl p-8 border transition-colors duration-300`}>
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <BarChart3 className="w-8 h-8 text-white" />
                                </div>
                                <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>Test Your Scenario</h2>
                                <p className={textSecondary}>What would you like this group to evaluate?</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className={`block text-sm font-semibold ${textPrimary} mb-3`}>
                                        Product or Scenario Description
                                    </label>
                                    <textarea
                                        value={simulationPrompt}
                                        onChange={(e) => setSimulationPrompt(e.target.value)}
                                        placeholder="e.g., A $29/month app that uses AI to plan meals and auto-generates grocery lists"
                                        rows="4"
                                        className={`w-full px-4 py-3 border-2 rounded-2xl transition-all duration-200 ${inputClass}`}
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(2)}
                                        className={`px-6 py-3 font-semibold rounded-2xl transition-all duration-200 hover:scale-105 ${
                                            darkMode 
                                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        onClick={runSimulation}
                                        disabled={!simulationPrompt.trim() || loading}
                                        className="flex-1 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <BarChart3 className="w-6 h-6" />
                                                Run Simulation
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Results */}
                {step === 4 && simulationData && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Overall Score */}
                        <div className={`${cardClass} rounded-3xl shadow-2xl p-10 border transition-colors duration-300`}>
                            <div className="text-center">
                                <div className="inline-block">
                                    <div className={`text-8xl font-black mb-4 bg-gradient-to-r ${
                                        simulationData.overallSentimentScore >= 2 ? 'from-emerald-600 to-green-600' :
                                        simulationData.overallSentimentScore <= -2 ? 'from-rose-600 to-red-600' : 'from-amber-600 to-yellow-600'
                                    } bg-clip-text text-transparent`}>
                                        {simulationData.overallSentimentScore > 0 ? '+' : ''}{simulationData.overallSentimentScore}
                                    </div>
                                    <div className={`text-base ${textSecondary} mb-6 font-medium`}>Overall Sentiment Score</div>
                                    <div className="flex items-center justify-center gap-3 text-sm font-medium">
                                        <span className="text-rose-600">-5</span>
                                        <div className="w-48 h-3 bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 rounded-full shadow-inner" />
                                        <span className="text-emerald-600">+5</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Executive Summary */}
                        <div className={`${cardClass} rounded-3xl shadow-2xl p-8 border transition-colors duration-300`}>
                            <h3 className={`text-2xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-sm">📊</span>
                                </div>
                                Executive Summary
                            </h3>
                            <p className={`${textSecondary} leading-relaxed text-lg`}>{simulationData.executiveSummary}</p>
                        </div>

                        {/* Key Findings */}
                        <div className={`${cardClass} rounded-3xl shadow-2xl p-8 border transition-colors duration-300`}>
                            <h3 className={`text-2xl font-bold ${textPrimary} mb-6 flex items-center gap-2`}>
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-sm">💡</span>
                                </div>
                                Key Insights
                            </h3>
                            <div className="space-y-4">
                                {simulationData.keyFindings.map((finding, idx) => (
                                    <div key={idx} className="flex gap-4 items-start group">
                                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                                            {idx + 1}
                                        </div>
                                        <p className={`${textSecondary} text-base pt-1`}>{finding}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Individual Reactions */}
                        <div className={`${cardClass} rounded-3xl shadow-2xl p-8 border transition-colors duration-300`}>
                            <h3 className={`text-2xl font-bold ${textPrimary} mb-6 flex items-center gap-2`}>
                                <div className="w-8 h-8 bg-gradient-to-br from-pink-600 to-rose-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-sm">👥</span>
                                </div>
                                Individual Reactions
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {simulationData.profileReactions.map((reaction, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${getSentimentColor(reaction.sentiment)}`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="font-bold text-lg">{reaction.name}</div>
                                            <div className="flex items-center gap-1">
                                                {getSentimentIcon(reaction.sentiment)}
                                            </div>
                                        </div>
                                        <p className="text-sm opacity-90 leading-relaxed">{reaction.reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center pt-4">
                            <button
                                onClick={() => {
                                    setStep(1);
                                    setProfiles([]);
                                    setSimulationData(null);
                                    setGroupDescription('');
                                    setSimulationPrompt('');
                                }}
                                className={`px-10 py-4 font-bold rounded-2xl transition-all duration-200 hover:scale-105 text-lg ${
                                    darkMode 
                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                Start New Simulation
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Profile Detail Modal */}
            {selectedProfile && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
                    onClick={() => setSelectedProfile(null)}
                >
                    <div 
                        className={`${cardClass} rounded-3xl shadow-2xl max-w-2xl w-full p-8 border-2 transition-colors duration-300 relative`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedProfile(null)}
                            className={`absolute top-6 right-6 p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                                darkMode ? 'bg-gray-800 text-gray-400 hover:text-gray-200' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Profile Header */}
                        <div className="mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-600 to-fuchsia-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                                <Users className="w-10 h-10 text-white" />
                            </div>
                            <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>{selectedProfile.name}</h2>
                            <p className={`text-lg ${textSecondary}`}>{selectedProfile.age} years old</p>
                        </div>

                        {/* Profile Details */}
                        <div className="space-y-4">
                            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
                                <div className="flex items-start gap-3">
                                    <Briefcase className={`w-5 h-5 mt-1 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                                    <div className="flex-1">
                                        <div className={`text-sm font-semibold ${textSecondary} mb-1`}>Occupation</div>
                                        <div className={`text-base ${textPrimary} font-medium`}>{selectedProfile.occupation}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
                                <div className="flex items-start gap-3">
                                    <Smartphone className={`w-5 h-5 mt-1 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                                    <div className="flex-1">
                                        <div className={`text-sm font-semibold ${textSecondary} mb-1`}>Tech Literacy</div>
                                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                            selectedProfile.techLiteracy.includes('High') 
                                                ? 'bg-green-100 text-green-700' 
                                                : selectedProfile.techLiteracy.includes('Moderate') 
                                                ? 'bg-yellow-100 text-yellow-700' 
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {selectedProfile.techLiteracy}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
                                <div className="flex items-start gap-3">
                                    <DollarSign className={`w-5 h-5 mt-1 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                                    <div className="flex-1">
                                        <div className={`text-sm font-semibold ${textSecondary} mb-1`}>Financial Status</div>
                                        <div className={`text-base ${textPrimary} font-medium`}>{selectedProfile.financialStatus}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
                                <div className="flex items-start gap-3">
                                    <Users className={`w-5 h-5 mt-1 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                                    <div className="flex-1">
                                        <div className={`text-sm font-semibold ${textSecondary} mb-1`}>Personality Trait</div>
                                        <div className={`text-base ${textPrimary} leading-relaxed`}>{selectedProfile.trait}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => setSelectedProfile(null)}
                            className={`w-full mt-6 py-3 font-semibold rounded-2xl transition-all duration-200 hover:scale-105 ${
                                darkMode 
                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default FocusGroupSimulator;