def value_of_card(card):
    """Determine the scoring value of a card.
    :param card: str - given card.
    :return: int - value of a given card.
    """
    if card in {'J', 'Q', 'K'}:
        return 10
    elif card == 'A':
        return 1  # For this function, we'll consider Ace as 1
    else:
        return int(card)  # For numerical cards '2'-'10'

def higher_card(card_one, card_two):
    """Determine which card has a higher value in the hand.
    :param card_one, card_two: str - cards dealt in hand.
    :return: str or tuple - the higher card or a tuple of both if they have equal value.
    """
    value_one = value_of_card(card_one)
    value_two = value_of_card(card_two)

    if value_one > value_two:
        return card_one
    elif value_two > value_one:
        return card_two
    else:
        return (card_one, card_two)

def value_of_ace(card_one, card_two):
    """Calculate the most advantageous value for an Ace card.
    :param card_one, card_two: str - cards dealt.
    :return: int - either 1 or 11 value for an Ace card.
    """
    total = value_of_card(card_one) + value_of_card(card_two)
    return 11 if total <= 10 else 1

def is_blackjack(card_one, card_two):
    """Determine if the hand is a 'natural' or 'blackjack'.
    :param card_one, card_two: str - cards dealt.
    :return: bool - True if the hand is a blackjack (two cards worth 21).
    """
    total = value_of_card(card_one) + value_of_card(card_two)
    return total == 21

def can_split_pairs(card_one, card_two):
    """Determine if a player can split their hand into two hands.
    :param card_one, card_two: str - cards dealt.
    :return: bool - True if the hand can be split into pairs.
    """
    return value_of_card(card_one) == value_of_card(card_two)

def can_double_down(card_one, card_two):
    """Determine if a blackjack player can place a double down bet.
    :param card_one, card_two: str - first and second cards in hand.
    :return: bool - True if the hand totals 9, 10, or 11.
    """
    total = value_of_card(card_one) + value_of_card(card_two)
    return total in {9, 10, 11}

