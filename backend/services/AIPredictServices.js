const SortAIByBestProbability = (data) => {
    const sortedWithProbability = data.sort((a, b) => {
        return b.probability - a.probability
    }
    )
    return sortedWithProbability
}