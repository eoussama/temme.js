/**
*
* @name:       temmejs
* @version:    0.3.0
* @author:     EOussama
* @license     MIT
* @source:     https://github.com/EOussama/temmejs
* 
* Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS,
* with no doubts, Emmet saved us from the headache of working with HTML and CSS, 
* and now, Temme is doing Javascript the same favour too.
*
*/

"use strict";

(function (obj) {
	function Temme(hierarchy = {}, target = document.body) {
		try {

			// Checking if the hieratchy is a valid object.
			if (hierarchy == null || typeof hierarchy !== 'object' || Array.isArray(hierarchy)) throw 'The hierarchy must be a valid object.';

			// Checking if the target is a valid HTML element.
			if (target == null || !(target instanceof HTMLElement)) throw 'The target must be a valid HTML element.';

			/**
			 *  Holds all elements with a reference in the hierarchy object.
			 */
			let references = [];

			/**
			 *  Gets all the references in the hierarchy object.
			 * 
			 *  @param {*} _hierarchy
			 *  @param {*} depth
			 */
			(function getReferences(_hierarchy, depth) {

				// Checking if the hierarchy object has the `ref` key.
				if ('ref' in _hierarchy) {

					// Adding the element to the references array as it's a
					// valid reference.
					references.push({
						refElement: _hierarchy,
						depth: depth
					});

					// Checking if the element has any children.
					if ('children' in _hierarchy) {

						// Looping through the element's children and
						// getting all their sub references.
						for (let child of _hierarchy['children']) {
							getReferences(child, ++depth);
						}
					}
				} else {

					// Checking if the element has any children.
					if ('children' in _hierarchy) {

						// Looping through the element's children and
						// getting all their sub references.
						for (let child of _hierarchy['children']) {
							getReferences(child, ++depth);
						}
					}
				}
			})(hierarchy, 0);

			/**
			 *  Replaces all the references.
			 * 
			 *  @param {*} _hierarchy
			 *  @param {*} depth
			 */
			(function affectReferences(_hierarchy, depth) {

				// Looping through all keys of the hierarchy object.
				for (let key in _hierarchy) {
					switch (key) {

						case 'ref': {
							if (_hierarchy[key] == null || typeof _hierarchy[key] !== 'string') {
								throw "The reference option must be a string.";
							}
						}

						case 'from': {

							// If the hierarchy object has a `from` key.
							if ('from' in _hierarchy) {

								// Check if the key is valie.
								if (_hierarchy['from'] == null || Array.isArray(_hierarchy['from']) || typeof _hierarchy['from'] !== 'object') {
									throw "The referencing option must be an object.";
								} else {

									// Checking if the `ref` option is valid.
									if ('ref' in _hierarchy['from']) {

										// Get the filtered references, must equel the one the current
										// element is pointing to and has a lower or a matching depth
										// indicating it's either a parent or a sibling so that no parent
										// can reference a child element.
										const reference = references
											.filter(ref => ref.refElement.ref === _hierarchy['from']['ref'] && ref.depth < depth)
											.sort((refA, refB) => refB.depth - refA.depth)[0];

										if (typeof reference !== 'undefined') {
											// Checking if the reference object `from` has a referencing mode.
											if ('mode' in _hierarchy['from']) {
												switch (_hierarchy['from']['mode']) {

													// Checking if the referencing mode is set on `append`.
													case 'append': {

														// looping through all the referenced object's options.
														for (let k in reference.refElement) {

															// Avoiding inheriting the `from`, `name` options.
															if (!['from', 'ref', 'name'].includes(k)) {

																// Checking if the option is an array.
																if (Array.isArray(reference.refElement[k])) {

																	// Checking children inheritance is enabled.
																	if (!('children' in _hierarchy['from']) || _hierarchy['from']['children'] !== true) {
																		if (k !== 'children') {

																			// Checking if the referencing element already has the said
																			// option, if yes, appending the value of that option from
																			// the referenced element with removing any duplicates.
																			if (k in _hierarchy) {
																				if (k === 'attributes') {
																					_hierarchy[k] = reference.refElement[k];
																				} else {
																					_hierarchy[k] = [..._hierarchy[k], ...reference.refElement[k].filter(el => !_hierarchy[k].includes(el))];
																				}

																				// If the referencing object doesn't have the said option,
																				// assigning it from its counterpart.
																			} else {
																				_hierarchy[k] = reference.refElement[k];
																			}
																		}
																	} else {

																		// Checking if the referencing element already has the said
																		// option, if yes, appending the value of that option from
																		// the referenced element with removing any duplicates.
																		if (k in _hierarchy) {
																			_hierarchy[k] = [..._hierarchy[k], ...reference.refElement[k].filter(el => !_hierarchy[k].includes(el))];

																			// If the referencing object doesn't have the said option,
																			// assigning it from its counterpart.
																		} else {
																			_hierarchy[k] = reference.refElement[k];
																		}
																	}

																	// Checking if the option is an object.
																} else if (typeof reference.refElement[k] === 'object') {
																	_hierarchy[k] = _hierarchy[k] || {};
																	
																	for (let objK in reference.refElement[k]) {
																		if (!(objK in _hierarchy[k])) {
																			_hierarchy[k][objK] = reference.refElement[k][objK];
																		}
																	}

																	// Checking if the option is anything but an Array or Object (primitive).
																} else {
																	_hierarchy[k] = reference.refElement[k];
																}
															}
														}

														break;
													}

													// Checking if the referencing mode is set on `override`.
													case 'override': {

														// looping through all the referenced object's options.
														for (let k in reference.refElement) {

															if (!('children' in _hierarchy['from']) || _hierarchy['from']['children'] !== true) {
																if (k !== 'children') {

																	// Avoiding inheriting the `from`, `name` or any existing options in
																	// the referencing element. Thus overriding what needs to be overriden
																	// and inheriting only the options that the referencing object lacks.
																	if (!['from', 'ref', 'name', ...Object.keys(_hierarchy)].includes(k)) {
																		_hierarchy[k] = reference.refElement[k];
																	}
																}
															} else {

																// Avoiding inheriting the `from`, `name` or any existing options in
																// the referencing element. Thus overriding what needs to be overriden
																// and inheriting only the options that the referencing object lacks.
																if (!['from', 'ref', 'name', ...Object.keys(_hierarchy)].includes(k)) {
																	_hierarchy[k] = reference.refElement[k];
																}
															}
														}

														break;
													}

													// Checking if the referencing mode is none of the above (invalid).
													default: {
														throw `“${_hierarchy['from']['mode']}” is not a valid referencing mode.`;
													}
												}
											} else {

												// looping through all the referenced object's options.
												for (let k in reference.refElement) {

													// Avoiding inheriting the `from`, `name` options.
													if (!['from', 'ref', 'name'].includes(k)) {

														// Checking if the option is an array.
														if (Array.isArray(reference.refElement[k])) {

															// Checking children inheritance is enabled.
															if (!('children' in _hierarchy['from']) || _hierarchy['from']['children'] !== true) {
																if (k !== 'children') {
																	// Checking if the referencing element already has the said
																	// option, if yes, appending the value of that option from
																	// the referenced element with removing any duplicates.
																	if (k in _hierarchy) {
																		_hierarchy[k] = [..._hierarchy[k], ...reference.refElement[k].filter(el => !_hierarchy[k].includes(el))];

																		// If the referencing object doesn't have the said option,
																		// assigning it from its counterpart.
																	} else {
																		_hierarchy[k] = reference.refElement[k];
																	}
																}
															} else {

																// Checking if the referencing element already has the said
																// option, if yes, appending the value of that option from
																// the referenced element with removing any duplicates.
																if (k in _hierarchy) {
																	_hierarchy[k] = [..._hierarchy[k], ...reference.refElement[k].filter(el => !_hierarchy[k].includes(el))];

																	// If the referencing object doesn't have the said option,
																	// assigning it from its counterpart.
																} else {
																	_hierarchy[k] = reference.refElement[k];
																}
															}

															// Checking if the option is an object.
														} else if (typeof reference.refElement[k] === 'object') {
															_hierarchy[k] = _hierarchy[k] || {};
															Object.assign(_hierarchy[k] || {}, reference.refElement[k]);

															// Checking if the option is anything but an Array or Object (primitive).
														} else {
															_hierarchy[k] = reference.refElement[k];
														}
													}
												}
											}
										} else {
											throw `“${_hierarchy['from']['ref']}” is not a valid reference.`;
										}
									} else {
										throw 'The `ref` option is missing from the `from` object.';
									}
								}
							}

							break;
						}

						// helo dd ma frind
						// Checking if the hierarchy object has the `children` option.
						case 'children': {
							if ('children' in _hierarchy) {

								// Checking if the children option is not valid then raising an error.
								if (_hierarchy[key] == null || !Array.isArray(_hierarchy.children)) {
									throw "The children option must be an array.";

									// Looping through the hierarchy object's children and
									// affecting the proper references to them.
								} else {
									_hierarchy.children.forEach(child => {
										affectReferences(child, ++depth);
									});
								}
							}

							break;
						}
					}
				}
			})(hierarchy, 0);

			/**
			 * Performs the Temme JS magic on a given element.
			 * 
			 * @param {*} _hierarchy 
			 * @param {*} element
			 */
			(function temmefy(_hierarchy, element) {
				for (let key in _hierarchy) {
					switch (key) {

						// Checking if the name option is valid.
						case 'name': {
							if (!('name' in _hierarchy) || _hierarchy[key] == null || typeof _hierarchy[key] !== 'string') {
								throw "The name option must be a valid string.";
							}
						}

						// Adding id to the element.
						case 'id': {
							if ('id' in _hierarchy) {
								if (_hierarchy[key] == null || typeof _hierarchy[key] !== 'string') {
									throw "The id option must be a string.";
								} else {
									element.id = _hierarchy[key];
								}
							}

							break;
						}

						// Adding classes to the element.
						case 'classes': {
							if ('classes' in _hierarchy) {
								if (_hierarchy[key] == null || !Array.isArray(_hierarchy[key])) {
									throw "The classes option must be an array.";
								} else {
									element.classList = [...element.classList, ..._hierarchy[key]].sort().join(' ');
								}
							}

							break;
						}

						// Adding attributes to the element.
						case 'attributes': {
							if ('attributes' in _hierarchy) {
								if (_hierarchy[key] == null || Array.isArray(_hierarchy[key]) || typeof _hierarchy[key] !== 'object') {
									throw "The attributes option must be a object.";
								} else {
									Object.keys(_hierarchy.attributes).forEach(attr => {
											element.setAttribute(attr, _hierarchy.attributes[attr]);
									});
								}
							}

							break;
						}

						// Adding data attributes to the element.
						case 'dataset': {
							if ('dataset' in _hierarchy) {
								if (_hierarchy[key] == null || Array.isArray(_hierarchy[key]) || typeof _hierarchy[key] !== 'object') {
									throw "The dataset option must be an object.";
								} else {
									Object.assign(element.dataset, _hierarchy.dataset || {});
								}
							}

							break;
						}

						// Adding text to the element.
						case 'text': {
							if ('text' in _hierarchy) {
								if (_hierarchy[key] == null || typeof _hierarchy[key] !== 'string') {
									throw "The text option must be a string.";
								} else {
									element.textContent = _hierarchy[key];
								}
							}

							break;
						}

						// Adding HTML to the element.
						case 'html': {
							if ('html' in _hierarchy) {
								if (_hierarchy[key] == null || typeof _hierarchy[key] !== 'string') {
									throw "The HTML option must be a string.";
								} else {
									element.innerHTML = _hierarchy[key];
								}
							}

							break;
						}

						// Adding children to the element.
						case 'children': {
							if ('children' in _hierarchy) {
								if (_hierarchy[key] == null || !Array.isArray(_hierarchy.children)) {
									throw "The children option must be an array.";
								} else {

									// Looping through the children of the hierarchy object.
									_hierarchy.children.forEach(child => {

										// Creating an element given the name if the hierarchy object.
										// If no valid name is found, create a div as the default behavior.
										const childNode = document.createElement(child['name'] || 'div');

										// Temmefying all the sub children as well.
										temmefy(child, childNode);

										// Adding the temmefied element to its parent.
										element.appendChild(childNode);
									});
								}
							}

							break;
						}

						// If it was none of the above options, 
						// flag it as invalid.
						default: {
							if (!['from', 'ref'].includes(key)) {
								throw `“${key}” is an invalid option.`;
							}
						}
					}
				}
			})(hierarchy, target);
		}
		catch (e) {
			throw `[Temme JS]: ${e}`;
		}
	}

	if (typeof exports !== 'undefined') {
		module.exports = Temme;
	} else {
		obj.Temme = Temme;
	}
})((typeof window !== 'undefined') ? window : this);
