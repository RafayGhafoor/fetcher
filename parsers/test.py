data = {'Algemeen': {'Referentie': 'BOSN20LGL36R', 'Branche': 'Groothandel', 'Soort bedrijf': 'Groothandel in elektrische gebruiksgoederen, Handelsonderneming, Overige groothandel', 'Land': 'Nederland', 'Regio': 'Locatie anoniem', 'Medewerkers': 'Geen', '% tijdelijk contract': '-', 'Bedrijf bestaat': 'Langer dan 10 jaar'}, 'Details': {'description': 'Deze groothandel staat te koop in verband met: andere ambities', 'headings_info': {'Indicatieve omzet': '€ 600.000', 'Indicatieve overnameprijs': '-'}, 'preferred_buyers': {'Gewenste kopers': ['Financiele koper - optimaliseert het bedrijf inhuidige vorm', 'Strategische koper - voegt het bedrijf samen met een ander bedrijf']}}}
for k, v in data.items():
    print(f"<{k}>")
    for k1,v1 in v.items():
        print(f"<{k1}>{v1}</{k1}>")
    print(f"</{k}>")