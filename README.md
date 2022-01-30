# Constituency TreeBank

A treebank is a corpus where the sentences in each language are syntactically (if necessary morphologically) annotated. In the treebanks, the syntactic annotation usually follows constituent and/or dependency structure.

Treebanks annotated for the syntactic or semantic structures of the sentences are essential for developing state-of-the-art statistical natural language processing (NLP) systems including part-of-speech-taggers, syntactic parsers, and machine translation systems. There are two main groups of syntactic treebanks, namely treebanks annotated for constituency (phrase structure) and the ones that are annotated for dependency structure.

## Data Format

We extend the original format with the relevant information, given between curly braces. For example, the word 'problem' in a sentence in the standard Penn Treebank notation, may be represented in the data format provided below:

	(NN problem)

After all levels of processing are finished, the data structure stored for the same word has the following form in the system.

	(NN {turkish=sorunu} {english=problem} 
	{morphologicalAnalysis=sorun+NOUN+A3SG+PNON+ACC}
	{metaMorphemes=sorun+yH}
	{semantics=TUR10-0703650})

As is self-explanatory, 'turkish' tag shows the original Turkish word; 'morphologicalanalysis' tag shows the correct morphological parse of that word; 'semantics' tag shows the ID of the correct sense of that word; 'namedEntity' tag shows the named entity tag of that word; 'propbank' tag shows the semantic role of that word for the verb synset id (frame id in the frame file) which is also given in that tag.

For Developers
============

You can also see [Java](https://github.com/starlangsoftware/AnnotatedTree), [Python](https://github.com/starlangsoftware/AnnotatedTree-Py), 
[Cython](https://github.com/starlangsoftware/AnnotatedTree-Cy), [C++](https://github.com/starlangsoftware/AnnotatedTree-CPP), or [C#](https://github.com/starlangsoftware/AnnotatedTree-CS) repository.

Detailed Description
============

+ [TreeBankDrawable](#treebankdrawable)
+ [ParseTreeDrawable](#parsetreedrawable)
+ [LayerInfo](#layerinfo)

## TreeBankDrawable

To load an annotated TreeBank:

	TreeBankDrawable(File folder, String pattern)
	a = new TreeBankDrawable(new File("/Turkish-Phrase"), ".train")

	TreeBankDrawable(File folder)
	a = new TreeBankDrawable(new File("/Turkish-Phrase"))

	TreeBankDrawable(File folder, String pattern, int from, int to)
	a = new TreeBankDrawable(new File("/Turkish-Phrase"), ".train", 1, 500)

To access all the trees in a TreeBankDrawable:

	for (int i = 0; i < a.sentenceCount(); i++){
		ParseTreeDrawable parseTree = (ParseTreeDrawable) a.get(i);
		....
	}

## ParseTreeDrawable

To load a saved ParseTreeDrawable:

	ParseTreeDrawable(FileInputStream file)
	
is used. Usually it is more useful to load TreeBankDrawable as explained above than to load ParseTree one by one.

To find the node number of a ParseTreeDrawable:

	int nodeCount()
	
the leaf number of a ParseTreeDrawable:

	int leafCount()
	
the word count in a ParseTreeDrawable:

	int wordCount(boolean excludeStopWords)
	
above methods can be used.

## LayerInfo

Information of an annotated word is kept in LayerInfo class. To access the morphological analysis
of the annotated word:

	MorphologicalParse getMorphologicalParseAt(int index)

meaning of an annotated word:

	String getSemanticAt(int index)

the shallow parse tag (e.g., subject, indirect object etc.) of annotated word: 

	String getShallowParseAt(int index)

the argument tag of the annotated word:

	Argument getArgumentAt(int index)
	
the word count in a node:

	int getNumberOfWords()

# Cite

	@inproceedings{yildiz-etal-2014-constructing,
    	title = "Constructing a {T}urkish-{E}nglish Parallel {T}ree{B}ank",
    	author = {Y{\i}ld{\i}z, Olcay Taner  and
      	Solak, Ercan  and
      	G{\"o}rg{\"u}n, Onur  and
      	Ehsani, Razieh},
    	booktitle = "Proceedings of the 52nd Annual Meeting of the Association for Computational Linguistics (Volume 2: Short Papers)",
    	month = jun,
    	year = "2014",
    	address = "Baltimore, Maryland",
    	publisher = "Association for Computational Linguistics",
    	url = "https://www.aclweb.org/anthology/P14-2019",
    	doi = "10.3115/v1/P14-2019",
    	pages = "112--117",
	}
	