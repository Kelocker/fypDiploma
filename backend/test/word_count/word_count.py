import re
from collections import Counter

def count_words(subtitle: str) -> dict:
    # Convert the subtitle to lowercase for case insensitivity
    subtitle = subtitle.lower()

    # Use a regex to find words, considering letters, digits, and apostrophes, but splitting on underscores
    words = re.findall(r"\b[a-z0-9']+\b", re.sub(r'[_]+', ' ', subtitle))

    # Count each word's occurrences using a Counter
    word_count = Counter(words)

    return dict(word_count)

# Example subtitle text
subtitle = "hey,my_spacebar_is_broken"
word_counts = count_words(subtitle)

# Print the results in a readable format
for word, count in sorted(word_counts.items()):
    print(f"{word}: {count}")